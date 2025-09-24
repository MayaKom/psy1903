/* function celsiusToFahrenheit(C) {
    let F = (C * 1.8) + 32
    return F
}
console.log(celsiusToFahrenheit(40)) */

/* function convertTemp(temp, convertTo) {
    let degrees = 0
    if (convertTo == 'F') {
        degrees = (temp * 1.8) + 32
    } else if (convertTo == 'C') {
        degrees = (temp - 32) / 1.8
    }
    return degrees
}

console.log(convertTemp(104, 'C')) */

/* function getWordLengths(words) {
    let lengths = [];
    for (let i = 0; i < words.length; i++) {
        let length = words[i].length
        lengths.push(length)
    }
    return lengths
}
let words = ["Alice", "Bill", "George"]

console.log(getWordLengths(words)) */

/* let words = ["Alice", "Bill", "George"]
function getLongestWord(words) {
    let longestWord = "";
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i]
        }
    }
    return longestWord
}

console.log(getLongestWord(words)) */


/* function getOddNumbers(n) {
    let results = [];
    for (let i = 0; i < n.length; i++) {
        if (n[i] % 2 != 0) {
            results.push(n[i])
        }

    }
    return results
}
console.log(getOddNumbers([1, 2, 3, 4, 5])) */
/* 
function filterNumbers(numbers, evenOrOdd) {
    let results = []
    for (let i = 0; i < numbers.length; i++) {
        if (evenOrOdd === "even" && numbers[i] % 2 === 0) {
            results.push(numbers[i]);
        } else if (evenOrOdd === "odd" && numbers[i] % 2 !== 0) {
            results.push(numbers[i]);
        }

    }
    return results;
}

console.log(filterNumbers([1, 2, 3, 4,], "even")) */

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

alert('Welcome to the even/odd response time task.\n\n You are about to see a series of numbers. If the number you see is EVEN, type the letter "e". If the number you see is odd, type the letter "o". \n\nPlease answer as quickly and accurately as possible.')
let results = []

for (let i = 0; i < 5; i++) {
    let num = getRandomNumber(1, 20);
    let start = new Date().getTime();
    let answer = prompt(`Is ${num} even or odd?`);
    if ((answer === "e" && num % 2 === 0) || (answer === "o" && num % 2 !== 0)) {
        correct = "correct"
    } else (correct = "incorrect")
    let end = new Date().getTime();
    let responseTime = (end - start) / 1000;
    results.push({
        number: num,
        response: answer,
        correct: correct,
        responseTime: responseTime
    });
}
alert('Thank you for your time');
console.log(results)
