
// Create an array of conditions

let conditions = [
    {
        title: 'uncertainBlock',
        instructions: `
        <h1>Instructions</h1>
        <p>You will play a game in which you have to choose between a lottery and a sure payout.</p>
        <p>All decisions you make in the task could influence the amount of reward you get at the end of the study.</p>
        <p>We have multiple bags with different proportions of blue and red chips. The colored bars represent the shares of blue and red chips in the bag.</p>
        <p>At the end of the task, one trial will be randomly picked: for example, if on that trial, you chose the sure outcome of $5, you will receive the $5, </p>
        <p>if you chose the lottery, we will play the lottery and receive the payout based on the outcome.</p>
        <p>When you are ready, press [SPACE] to begin.</p>
        `,
        stimuli: [
            { image: 'img/unc/unc-75-5.png' },
            { image: 'img/unc/unc-75-8.png' },
            { image: 'img/unc/unc-75-20.png' },
            { image: 'img/unc/unc-75-50.png' },
            { image: 'img/unc/unc-75-125.png' },
            { image: 'img/unc/unc-50-5.png' },
            { image: 'img/unc/unc-50-8.png' },
            { image: 'img/unc/unc-50-20.png' },
            { image: 'img/unc/unc-50-50.png' },
            { image: 'img/unc/unc-50-125.png' },
            { image: 'img/unc/unc-25-5.png' },
            { image: 'img/unc/unc-25-8.png' },
            { image: 'img/unc/unc-25-20.png' },
            { image: 'img/unc/unc-25-50.png' },
            { image: 'img/unc/unc-25-125.png' },
        ]
    },
    {
        title: 'ambiguousBlock',
        instructions: `
        <h1>Instructions</h1>
        <p>You will play a game in which you have to choose between a lottery and a sure payout. All decisions you make in the task could influence the amount of reward you get at the end of the study.</p>
        <p>We have multiple bags with different proportions of blue and red chips. The colored bars represent the shares of blue and red chips in the bag.</p>
        <p>You will not be able to see what the exact shares of blue and red chips are.</p>
        <p>At the end of the task, one trial will be randomly picked: for example, if on that trial, you chose the sure outcome of $5, you will receive the $5, if you chose the lottery, we will play the lottery and receive the payout based on the outcome.</p>
        <p>When you are ready, press [SPACE] to begin.</>
    `,
        stimuli: [
            { image: 'img/amb/amb-74-5.png' },
            { image: 'img/amb/amb-74-8.png' },
            { image: 'img/amb/amb-74-20.png' },
            { image: 'img/amb/amb-74-50.png' },
            { image: 'img/amb/amb-74-125.png' },
            { image: 'img/amb/amb-50-5.png' },
            { image: 'img/amb/amb-50-8.png' },
            { image: 'img/amb/amb-50-20.png' },
            { image: 'img/amb/amb-50-50.png' },
            { image: 'img/amb/amb-50-125.png' },
            { image: 'img/amb/amb-24-5.png' },
            { image: 'img/amb/amb-24-8.png' },
            { image: 'img/amb/amb-24-20.png' },
            { image: 'img/amb/amb-24-50.png' },
            { image: 'img/amb/amb-24-125.png' }
        ]
    }
];