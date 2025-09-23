/* console.log("Hello from week 4")
let response = 10;
let responseTime = 2.33;
let feedback = 'correct';
console.log(`Your answer's ${response} in ${responseTime}`); */

/* 

console.log(randomNum1, randomNum2)

 */

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

let results = []

for (let i = 1; i < 3; i++) {
    let num1 = getRandomNumber(0, 10);
    let num2 = getRandomNumber(50, 100);
    let start = new Date().getTime();
    let answer = prompt('what is ' + num1 + "+" + num2 + '?');
    let end = new Date().getTime();
    let responseTime = (end - start) / 1000;
    if (answer == (num1 + num2)) {
        feedback = 'CORRECT'
    } else {
        feedback = 'INCORRECT'
    }
    results.push(feedback, responseTime)
    alert('You answered ' + answer + ' in ' + responseTime + ' seconds. Your response was ' + feedback);
}
console.log(results)







