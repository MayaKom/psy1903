
// Create an array of conditions

let conditions = [
    {
        title: 'uncertainBlock',
        instructions: `
        <h1>Instructions</h1>
        <p>In this part of the task, you will see a series of colored bars which represent the proportion of blue and red chips in a</p>
        <p>bag. Next to the red bar you will see the winning amount if a red chip is drawn. You can choose between playing the lottery</p>
        <p>and a sure payout of $5. Remember, all decisions you make in the task could influence the amount of reward you get at the end of the study.</p>
        <p>When you are ready, press <span class='key'>SPACE</span> to begin.</p>
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
        <p>We have multiple bags with different proportions of blue and red chips. The colored bars represent the shares of blue and red chips in the bag.</p>
        <p>In this part of the task, you will not be able to see what the exact shares of blue and red chips are in the bag. A gray bar will occlude some portion of the bar.</p>
        <p>Remember, all decisions you make in the task could influence the amount of reward you get at the end of the study.</p>
        <p>When you are ready, press <span class='key'>SPACE</span> to begin.</>
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