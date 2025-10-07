let jsPsych = initJsPsych();
let timeline = [];




// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1 class='welcome'> Welcome to the Math Response Task!</h1>
        <p>In this experiment, you will be shown a series of math questions.</p>
        <p>Please answer as quickly and accurately as possible.</p>
        <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial)


for (let condition of conditions) {
    let choices = [condition.correctAnswer, condition.altNumber];
    choices = jsPsych.randomization.shuffle(choices);
    let correctIndex = choices.indexOf(condition.correctAnswer);
    let conditionTrial = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<p class='equation'>What is <span class='num'>${condition.num1}</span> + 
        <span class='num'>${condition.num2}</span>?</p>`,
        html: `<p><input type='text' name='response' id='response'></p>`,
        autofocus: 'response',
        button_label: 'Submit Answer',

        data: {
            collect: true,
            number1: condition.num1,
            number2: condition.num2,
            correctAnswer: condition.correctAnswer
        },
        on_finish: function (data) {
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
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);


jsPsych.run(timeline)