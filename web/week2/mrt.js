alert('In this experiment we will measure your response time.You will be shown a series of simple math equations.Answer these equations as quickly and accurately as you can')
let start1 = new Date().getTime();
let answer1 = prompt('what is 1 + 4?');
let end1 = new Date().getTime();
let responseTime1 = (end1 - start1) / 1000;
alert('You answered ' + answer1 + ' in ' + responseTime1 + ' seconds');
let start2 = new Date().getTime();
let answer2 = prompt('What is 3 + 5?');
let end2 = new Date().getTime();
let responseTime2 = (end2 - start2) / 1000;
alert('You answered ' + answer2 + ' in ' + responseTime2 + ' seconds');
let start3 = new Date().getTime();
let answer3 = prompt('What is 4+6?');
let end3 = new Date().getTime();
let responseTime3 = (end3 - start3) / 1000;
alert('You answered ' + answer3 + ' in ' + responseTime3 + ' seconds');
alert('Thank you for your participation!');
