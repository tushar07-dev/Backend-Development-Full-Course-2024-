const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

// Only by removing console, the output changes, The order in which two timer will execute is non-determinant, as it is bound by performance of individuale system 
// explained this in node js documentation -> For example, if we run the following script which is not within an I/O cycle (i.e. the main module), the order in which the two timers are executed is non-deterministic, as it is bound by the performance of the process:
https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

// setTimeout(()=> console.log('Hello, Timer 1'),0);
// setImmediate(()=> console.log('Hello, Immediate 1'));
// console.log('Hello, from Top level synchronous code')

// &&

// setTimeout(()=> console.log('Hello, Timer 1'),0);
// setImmediate(()=> console.log('Hello, Immediate 1'));

// -----------------File Io polling example----------------------------------

// setTimeout(() => console.log('Hello, from timer 1'),0);
// setImmediate(()=> console.log('Hello, from Immediate 1'));

// fs.readFile('sample.txt', 'utf-8', () => {
//   console.log('Io poliing Finish');
//     setTimeout(() => console.log('Hello, from timer 2'), 0);
//     setTimeout(() => console.log('Hello, from timer 3'), 5*1000);
//     setImmediate(() => console.log('Hello, from Immediate 2'));
// });
// console.log('Hello, from Top level synchronous code')

// -----------------Thread pool example for CPU intesive tasks----------------------------------

process.env.UV_THREADPOOL_SIZE = 2;  // not able to control thread pool size ? 

setTimeout(() => console.log('Hello, from timer 1'),0);
setImmediate(()=> console.log('Hello, from Immediate 1'));

fs.readFile('sample.txt', 'utf-8', () => {
  console.log('Io poliing Fisnish');
  setTimeout(() => console.log('Hello, from timer 2'), 0);
  setTimeout(() => console.log('Hello, from timer 3'), 5*1000);
  setImmediate(() => console.log('Hello, from Immediate 2'));

  // crypto tasks
  crypto.pbkdf2('password1', 'salt1', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 1 Done`);
  });
  crypto.pbkdf2('password2', 'salt2', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 2 Done`);
  });
  crypto.pbkdf2('password3', 'salt3', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 3 Done`);
  });
  crypto.pbkdf2('password4', 'salt4', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 4 Done`);
  });
  crypto.pbkdf2('password5', 'salt5', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 5 Done`);
  });
  crypto.pbkdf2('password6', 'salt6', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 6 Done`);
  });
  crypto.pbkdf2('password7', 'salt7', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 7 Done`);
  });
  crypto.pbkdf2('password8', 'salt8', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 8 Done`);
  });
  crypto.pbkdf2('password9', 'salt9', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 9 Done`);
  });
  crypto.pbkdf2('password10', 'salt10', 100000, 1024, 'sha512', () => {
    console.log(`${Date.now() - start}ms, password 10 Done`);
  });
});
console.log('Hello, from Top level synchronous code')

// Few years back,
// She: Dont ever forget me
// He: i can never forget you.

// but thruth is this. Everyday, little by little, i am forgetting her.
// Earlier, it took me a second to recall her face, Then it started to take 10seconds, and then 30seconds
// Like the evening's gentle shadow, slowly fading away

// Memoery is such strange thing, The garden next to her house, I remember eacha nd every details of that scene,
// sometimes i worry that i have forgotten all important things
// or maybe map cluster with unwanted details.
// But now more her memoeries blurred with passing of the evening the better i understood her.

// Maybe after sometime the remaining shadows will also be swallowed up by the darkness