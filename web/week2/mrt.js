alert('In this experiment we will measure your response time.You will be shown a series of simple math equations.Answer these equations as quickly and accurately as you can')
let start1 = new Date().getTime();
let answer1 = prompt('what is ' + (Math.floor(Math.random() * 10) + 1) + "+" + (Math.floor(Math.random() * 10) + 1));

let end1 = new Date().getTime();
let responseTime1 = (end1 - start1) / 1000;
alert('You answered ' + answer1 + ' in ' + responseTime1 + ' seconds');
let start2 = new Date().getTime();
let answer2 = prompt('what is ' + (Math.floor(Math.random() * 10) + 1) + "+" + (Math.floor(Math.random() * 10) + 1));

let end2 = new Date().getTime();
let responseTime2 = (end2 - start2) / 1000;
alert('You answered ' + answer2 + ' in ' + responseTime2 + ' seconds');
let start3 = new Date().getTime();
let answer3 = prompt('what is ' + (Math.floor(Math.random() * 10) + 1) + "+" + (Math.floor(Math.random() * 10) + 1));

let end3 = new Date().getTime();
let responseTime3 = (end3 - start3) / 1000;
alert('You answered ' + answer3 + ' in ' + responseTime3 + ' seconds');
alert('Thank you for your participation!');
