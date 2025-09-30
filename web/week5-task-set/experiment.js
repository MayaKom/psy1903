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
    let conditionTrial = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<p>What is ${condition.num1} + ${condition.num2}?</p>`,
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
            let userResponse = data.response.response;
            if (userResponse == condition.correctAnswer) {
                data.correct = true;
            } else {
                data.correct = false;
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