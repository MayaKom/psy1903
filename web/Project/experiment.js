let jsPsych = initJsPsych();

let timeline = []

// consent trial

let consentTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome</h1> 

    <p>The experiment you are about to complete is an educational exercise designed for PSY 1903: Programming for Psychological Scientists</em>; it is not intended as a true scientific experiment.</p>
    <p>No identifying information will be collected, data will not be shared beyond our class, and your participation is completely voluntary.</p>
    <p>If you have any questions, please reach out to Dr. Garth Coombs (garthcoombs@fas.harvard.edu), one of the head instructors of PSY 1903.</p>
    <p>If you agree to participate, press <span class='key'>SPACE</span> to continue.</>
    `,

    // Listen for the SPACE key to be pressed to proceed
    choices: [' '],
};
timeline.push(consentTrial);

let enterFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
};

timeline.push(enterFullScreenTrial);

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Uncertainty Task!</h1> 
    <p>In this game, you will make a series of choices between a lottery and a sure payout. Each lottery involves guessing which color chip (blue or red) will be drawn from a bag containing both colors in varying proportions.</p>
    <p><img src='img/bag.png'width="100"></p>
    <p>Colored bars on the screen show how much of each color is in the bag for that round. Example:</p>
    <p><img src='img/practice-50.png'width="600"></p>
    <p>Your decisions may affect the amount of reward you receive at the end of the study.</p>
    <p>When you are ready, press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};


timeline.push(welcomeTrial);


let randomizedBlocks = jsPsych.randomization.shuffle(conditions);


for (let block of randomizedBlocks) {
    let instructionsTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: block.instructions,
        choices: [' ']
    };
    timeline.push(instructionsTrial);


    let compCheckTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: block.practiceTrial,
        choices: block.practiceChoices,
        data: { task: 'compCheck' },
        on_finish: function (data) {
            let choice_label = block.practiceChoices[data.response];
            // Compare it to the correct answer string
            data.correct = (choice_label == block.practiceCorrect);
        }
    };


    let feedback = {
        type: jsPsychHtmlButtonResponse,
        stimulus: function () {
            let last_trial = jsPsych.data.get().last(1).values()[0];
            if (!last_trial.correct) {
                return "<p style='color:red;'>Try again! What is the share of red chips?</p>";
            } else {
                return "<p style='color:green;'>Correct!</p>";
            }
        },
        choices: ["continue"],
        on_finish: function (data) {
            let last_trial = jsPsych.data.get().last(2).values()[0]; // check the trial before feedback
            if (!last_trial.correct) {
                jsPsych.timelineVariable('repeat', true);
            }
        }
    };


    // Now we make a loop that repeats until they get it right

    let compCheckLoop = {
        timeline: [compCheckTrial, feedback],
        loop_function: function () {
            let last_trial = jsPsych.data.get().last(2).values()[0];
            return !last_trial.correct; // repeats until correct
        }
    };

    timeline.push(compCheckLoop);





    let randomizedStimuli = jsPsych.randomization.shuffle(block.stimuli);
    for (let stimulus of randomizedStimuli) {

        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `+`,
            trial_duration: 500,
            choices: "NO_KEYS"
        };
        timeline.push(fixationTrial);
        let choices = jsPsych.randomization.shuffle(["Draw a chip", "Take the $5"]);
        let conditionTrial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `<img src=${stimulus.image} width="800">`,
            choices: choices,
            data: {
                collect: true,
                condition: block.title,
                trial: stimulus.image.split('/').pop().replace('.png', ''),
            },
            on_finish: function (data) {
                data.choice = choices[data.response];
            }
        };

        timeline.push(conditionTrial);
    };
}

// Likert survey trial

let likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

let survey_instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>For the final task, you will view a series of statements.</p>
    <p>Please read each of the statements and indicate how much you personally agree or disagree with them.</p>
    <p>Press <span class='key'>SPACE</span> to proceed.`,
    choices: [' ']
}

timeline.push(survey_instructions)

let likert_questions = [
    { prompt: "Unforeseen events upset me greatly", name: "p1" },
    { prompt: "It frustrates me not having all the information I need", name: "p2" },
    { prompt: "One should always look ahead so as to avoid surprises", name: "p3" },
    { prompt: "A small, unforeseen event can spoil everything, even with the best of planning", name: "p4" },
    { prompt: "I always want to know what the future has is store for me", name: "p5" },
    { prompt: "I can’t stand being taken by surprise", name: "p6" },
    { prompt: "I should be able to organize everything in advance", name: "p7" },
    { prompt: "Uncertainty keeps me from living a full life", name: "I1" },
    { prompt: "When it’s time to act, uncertainty paralyses me", name: "I2" },
    { prompt: "When I am uncertain I can’t function very well", name: "I3" },
    { prompt: "The smallest doubt can stop me from acting", name: "I4" },
    { prompt: "I must get away from all uncertain situations", name: "I5" }
];

let questions = likert_questions.map(q => ({
    prompt: q.prompt,
    name: q.name,
    labels: likert_scale,
    required: true
}));


let likertTrial = {
    type: jsPsychSurveyLikert,
    questions: questions,
    randomize_question_order: false,
    data: {
        collect: true
    }
}


timeline.push(likertTrial);


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
        let prefix = 'uncertainty-tolerance';
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

let exitFullScreenTrial = {
    type: jsPsychFullscreen,
    fullscreen_mode: false
};
timeline.push(exitFullScreenTrial);

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: 'NO_KEYS'
};

timeline.push(debriefTrial);


jsPsych.run(timeline);