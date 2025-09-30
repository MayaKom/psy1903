let conditions = [];

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let condition = {
        num1: num1,
        num2: num2,
        correctAnswer: num1 + num2
    }
    conditions.push(condition)
}

// Output the resulting conditions array to make sure it is set up correctly
console.log(conditions);