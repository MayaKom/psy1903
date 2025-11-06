let jsPsych = initJsPsych({
    show_progress_bar: true
});

// Retrieve the query string from the URL
let queryString = new URLSearchParams(window.location.search);

// Extract the value for qualtricsId from the query string
let qualtricsId = queryString.get('qualtricsId');

// Persist the value for qualtricsId to your experiment data
jsPsych.data.addProperties({ qualtricsId: qualtricsId });


let timeline = [];

let colors = jsPsych.randomization.repeat(['red', 'green', 'blue'], 1);
let color = colors.pop();

let trial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['f', 'j'],
    stimulus: `
        <span class='${color}'>ball</span>`
};

/* timeline.push(trial)
 */

let ageCheckTrial = {
    type: jsPsychSurveyHtmlForm,
    html: `
    <h1>Welcome!</h1> 
    Please enter your age to continue: <input type='text' name='age' id='age'>
    `,
    autofocus: 'age',
    on_finish: function (data) {
        if (data.response.age < 18) {
            jsPsych.abortExperiment('You must be 18 years or older to complete this experiment.');
        }
    }
}

timeline.push(ageCheckTrial);

let enterFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
};

timeline.push(enterFullScreenTrial);

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1> Welcome to the Lexical Decision Task! </h1 >
        <p> You are about to see a series of characters. </p>
        <p> Press F is characters make up a word. </p>
        <p> Press J if characters don't make up a word. </p>
        <p class='instructions'> Press <span class = 'key'>SPACE</span> to begin </p>
`,
    choices: [' '],
};

timeline.push(welcomeTrial)


let primeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>You were randomly chosen to see this trial.</p> 
        <p>Press the <span class='key'>SPACE</span> key to continue.</p>
        `,
    choices: [' '],
    data: {
        collect: true,
        trialType: 'prime',
    },
    on_load: function () {
        if (getRandomNumber(0, 1) == 0) {
            jsPsych.data.addProperties({ sawPrime: false });
            jsPsych.finishTrial();
        } else {
            jsPsych.data.addProperties({ sawPrime: true });
        }
    }
}
timeline.push(primeTrial);

for (let block of conditions) {

    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);
    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
    <h1> ${block.title}</h1 >
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the F key.</p>
            <p>If the characters do not make up a word, press the J key.</p>
            <p class='instructions'>Press SPACE to begin.</p>
`,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1> ${condition.characters}</h1 > `,
            choices: ['f', 'j'],
            data: {
                trialType: 'mainTrial',
                collect: true,
                characters: condition.characters,
                blockID: block.title
            },
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord == true) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
        let feedbackTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1 class='incorrectFeedback'>Incorrect</h1>`,
            trial_duration: 1000,
            choices: ['NO KEY'],
            on_load: function () {
                let lastTrialData = jsPsych.data.getLastTrialData().values()[0];
                if (lastTrialData.correct) {
                    // Force skip this feedback trial if they got the previous trial correct
                    jsPsych.finishTrial();
                }
            },
        }
        timeline.push(feedbackTrial);
    }
}

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
    <h1> Please wait...</h1 >
    <span class='loader'></span>
    <p>We are saving the results of your inputs.</p>
`,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'lexical-decision';
        let dataPipeExperimentId = 'OV8df8DU3zXE';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();
        console.log(results)
        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}

timeline.push(resultsTrial);

let exitFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
};
timeline.push(exitFullScreenTrial);

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> Thank you!</h1 >
    <p>You can now close this tab.</p
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        jsPsych.progressBar.progress = 1;
    }
}
timeline.push(debriefTrial)
jsPsych.run(timeline)

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

