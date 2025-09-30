let jsPsych = initJsPsych();
let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1> Welcome to the Math Response Task </h1>
        <p> In this experiment... </p>
        <p>  </p>
        <p> </p>
        <p>  </p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial)






// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
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