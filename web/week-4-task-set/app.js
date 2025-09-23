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

function getLongestWord(words) {
    let longestWord = "";
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i]
        }
    }
    return longestWord
}

console.log(getLongestWord(words))