let jsPsych = initJsPsych();
let timeline = [];




// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1> Welcome to the Math Response Task!</h1>
        <p>In this experiment, you will be shown a series of math questions.</p>
        <p>Please answer as quickly and accurately as possible.</p>
        <p>Press SPACE to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial)


for (let condition of conditions) {
    let choices = [condition.correctAnswer, condition.altNumber];
    choices = jsPsych.randomization.shuffle(choices);
    let correctIndex = choices.indexOf(condition.correctAnswer);
    let conditionTrial = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<p>What is ${condition.num1} + ${condition.num2}?</p>`,
        choices: choices,

        data: {
            collect: true,
            number1: condition.num1,
            number2: condition.num2,
            correctAnswer: condition.correctAnswer,
            altAnswer: condition.altNumber
        },
        on_finish: function (data) {
            let userResponseIndex = data.response;
            let userResponseValue = choices[userResponseIndex];
            data.userResponse = userResponseValue;
            if (userResponseValue == condition.correctAnswer) {
                data.correct = true;  // Correct response
            } else {
                data.correct = false;  // Incorrect response
            }

        }

    }
    timeline.push(conditionTrial)
}


// Debrief
let debriefTrial = {
    type: jsPsychSurveyHtmlForm,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);


jsPsych.run(timeline)