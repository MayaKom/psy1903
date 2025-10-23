
// Create an array of conditions

let conditions = [
    {
        title: 'uncertainBlock',
        instructions: `
        <h1>Instructions</h1>
        <p>In this round, you’ll see a bag represented by a colored bar showing the proportions of blue and red chips it contains.</p>
        <p><img src='img/unc/unc-75-5.png'width="400"></p>
        <p>You can choose to play the lottery (draw a random chip) or take a sure reward of $5.</p>
        <p>If a blue chip is drawn, you earn $0; if a red chip is drawn, you earn the amount shown for that round.</p>
        <p>In this round, you will see <span class='manipulation'>the exact shares of blue and red chips</span> in each bag.</p>
        <p>When you are ready, press <span class='key'>SPACE</span> to begin.</p>
        `,
        practiceTrial: `
           <h1>Practice</h1>
           <p>Before beginning playing, let's first practice the game</p>
            <p>In this trial what is the share of red chips in the bag?</p>
            <p><img src="img/unc/unc-75-8.png" width="600"></p>
            `,
        practiceChoices: ["not shown", "75%", "25%"],
        practiceCorrect: ["75%"],
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
        <p>In this round you’ll see a colored bar representing a bag with blue and red chips, and you’ll choose between the lottery or a sure $5 reward.</p>
        <p>However, in this part of the task, you will not see the exact proportions of blue and red chips. A gray bar will cover part of the colored bar to obscure some information about the bag’s contents.</p>
        <p>When you are ready, press <span class='key'>SPACE</span> to begin</p>
    `,
        practiceTrial: `
        <h1>Practice</h1>
        <p>Before beginning playing, let's first practice the game</p>    
        <p>In this trial what is the share of red chips in the bag?</p>
        <p><img src="img/amb/amb-24-8.png" width="600"></p>
            `,
        practiceChoices: ["Not shown", "38", "20"],
        practiceCorrect: ["Not shown"],
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