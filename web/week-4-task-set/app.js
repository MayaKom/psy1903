/* function celsiusToFahrenheit(C) {
    let F = (C * 1.8) + 32
    return F
}
console.log(celsiusToFahrenheit(40)) */

function convertTemp(temp, convertTo) {
    let degrees = 0
    if (convertTo == 'F') {
        degrees = (temp * 1.8) + 32
    } else if (convertTo == 'C') {
        degrees = (temp - 32) / 1.8
    }
    return degrees
}

console.log(convertTemp(104, 'C'))