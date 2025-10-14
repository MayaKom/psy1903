
// Create an array of conditions

let conditions = [
    {
        title: 'uncertainBlock',
        instructions: `
        <h1>Instructions</h1>
        <p>We have multiple bags which contain different proportions of blue and red chips. You will be shown colored bars that represent the shares of blue and red chips in the bag.</p>
        <p>You will play a game for hypothetical monetary reward. For each bag of chips, you can decide to lottery (pick a random chip) or take a safe bet (ensured $5 reward). Blue chips will result in $0, and red chip values will change per bag.</p>
        <p>In this part of the task, <span class='manipulation'>you will see the exact shares of blue and red chips</span> in the bag.</p>
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
        <p>We have multiple bags which contain different proportions of blue and red chips. You will be shown colored bars that represent the shares of blue and red chips in the bag.</p>
        <p>You will play a game for hypothetical monetary reward. For each bag of chips, you can decide to lottery (pick a random chip) or take a safe bet (ensured $5 reward). Blue chips will result in $0, and red chip values will change per bag.</p>
        <p>In this part of the task, you will not see the exact shares of blue and red chips in the bag. A gray bar will occlude some portion of the bar.</p>
        <p>When you are ready, press <span class='key'>SPACE</span> to begin</p>
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