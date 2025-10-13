let jsPsych = initJsPsych();

let timeline = []

// Welcome & consent trial
// NEED TO DO - mention you will recieve two games/instructions

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Uncertainty Task!</h1> 
    <p>In this experiment ... </p>
    `,
    choices: [' '],
};


timeline.push(welcomeTrial);



let randomizedBlocks = jsPsych.randomization.shuffle(conditions);


for (let block of randomizedBlocks) {
    let instructionsTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: block.instructions
    };
    timeline.push(instructionsTrial);

    let randomizedStimuli = jsPsych.randomization.shuffle(block.stimuli);
    for (let stimulus of randomizedStimuli) {

        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `+`,
            trial_duration: 500,
            choices: "NO_KEYS"
        };
        timeline.push(fixationTrial);
        let choices = jsPsych.randomization.shuffle(["Lottery: draw a chip", "$5"]);
        let conditionTrial = {
            type: jsPsychHtmlButtonResponse,
            stimulus: `<img src=${stimulus.image} width="600">`,
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
    }
}

// Likert survey trial

let likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

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

let questions = []

for (let q of likert_questions) {
    questions.push({
        prompt: q.prompt,
        name: q.name,
        labels: likert_scale,
        required: true
    }
    )
}
let likertTrial = {
    type: jsPsychSurveyLikert,
    questions: questions,
    randomize_question_order: false,
    data: { collect: true }
};


timeline.push(likertTrial);


let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: 'NO_KEYS'
};

timeline.push(debriefTrial);


jsPsych.run(timeline)