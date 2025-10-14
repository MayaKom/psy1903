let jsPsych = initJsPsych();
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

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1> Welcome to the Lexical Decision Task </h1 >
        <p> You are about to see a series of characters. </p>
        <p> Press F is characters make up a word. </p>
        <p> Press J if characters don't make up a word. </p>
        <p class='instructions'> Press <span class = 'key'>SPACE</span> to begin </p>
`,
    choices: [' '],
};
timeline.push(welcomeTrial)




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
        timeline.push(conditionTrial)
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
        let forceOSFSave = true;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

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

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> Thank you!</h1 >
    <p>You can now close this tab.</p
    `,
    choices: ['NO KEYS']
}
timeline.push(debriefTrial)
jsPsych.run(timeline)