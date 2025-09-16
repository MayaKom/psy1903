// Identify elements on the page we will update
let num1 = document.getElementById('num1');
let num2 = document.getElementById('num2');

let randomNum1 = Math.floor(Math.random() * 10) + 1;
let randomNum2 = Math.floor(Math.random() * 10) + 1;
num1.innerHTML = randomNum1;
num2.innerHTML = randomNum2;

/* let response = prompt('What is your name?');
let count = response.length;
console.log(count);
let firstLetter = response.charAt(0)
console.log(firstLetter)
let lastLetter = response.charAt(count - 1);
console.log(lastLetter)
 */

/* let a = 5;
let b = 10;
console.log(a > 3 && b < 15); */

/* let over18 = false;
let hasGuardianApproval = true;
console.log(over18 || hasGuardianApproval); */

/* let count = 8;
console.log(count % 2 == 0); */


/* let response = prompt('What is ' + randomNum1 + '+' + randomNum2 + '?');


let feedback = '';

if (response == (randomNum1 + randomNum2)) {
    feedback = 'Correct!';
} else if (response == (randomNum1 + randomNum2 - 1) || response == (randomNum1 + randomNum2 + 1)) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The expected answer is ' + (randomNum1 + randomNum2)); */

/* let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
} else if (age >= 12 & age < 18) {
    alert('Teenager');
} else {
    alert('Adult');
} */

let num = prompt("Please enter a whole number")
if (num % 2 == 0) {
    alert('The number you entered was even')
} else if (num % 2 == 1) {
    alert('The number you entered was odd')
}