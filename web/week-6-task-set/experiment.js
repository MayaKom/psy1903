let jsPsych = initJsPsych();
let timeline = [];




// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1 class='welcome'> Welcome to the Math Response Task!</h1>
        <p>In this experiment, you will be shown a series of math questions.</p>
        <p>Please answer as quickly and accurately as possible.</p>
        <p>Before starting the task, we will ask you a couple of questions about yourself.</p>
        <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial)

let likertQuestion = {
    type: jsPsychSurveyLikert,
    questions: [
        {
            prompt: 'I enjoy solving math problems.',
            labels: [
                "Strongly Disagree",
                "Disagree",
                "Neutral",
                "Agree",
                "Strongly Agree"
            ]
        },
        {
            prompt: 'I find math easy.',
            labels: [
                "Strongly Disagree",
                "Disagree",
                "Neutral",
                "Agree",
                "Strongly Agree"
            ]
        }
    ],
    data: {
        collect: true
    }
};

timeline.push(likertQuestion)



for (let condition of conditions) {
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
            data.response = data.response.response;  // flatten
            data.correct = (data.response == condition.correctAnswer);
        }

    }
    timeline.push(conditionTrial)
}



let results = jsPsych.data.get().values();
console.log(results);

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'mrt';
        let dataPipeExperimentId = '001';
        let forceOSFSave = false;


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

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
  `,
    choices: "NO_KEYS"
};
timeline.push(debriefTrial);


jsPsych.run(timeline)