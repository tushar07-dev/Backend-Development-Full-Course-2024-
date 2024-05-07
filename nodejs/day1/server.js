console.log("server file is ready");
// //no need to call
// (function() {
//     console.log('prince');
// })();

// //call back: call back is function, it calls when main function executed, after that call back fucntion calls
// function callback(a){
//     console.log(a + ' is succesfully added');
//     return a+a;
// }

// const add = function(a, b, callback) { //main function
//     const result = a + b;
//     console.log('result' , result);
//     callback(result);   // call Back function
// }

// add(3,4, callback);


// ----------------------------- //

// const add = function(a, b, callback) { //main function
//     const result = a + b;
//     console.log('result' , result);
//     callback(result);   // call Back function
// }

// add(2,3, ()=> console.log('add completed'));


// ----------------------------- //

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);

// ----------------------------- //


// https://nodejs.org/api/fs.html
// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', ()=> {
//     console.log('file is created');
// });
// // console.log(fs);
// // console.log(os);

// ----------------------------- //

// const notes = require('./notes');
// you an also import variable and functions
// console.log(notes.age);
// console.log(notes.addNum(notes.age,7));

// ----------------------------- //
// Loadash - provide build in package function to hand data and array.
var _ = require('lodash');

var data = ['person', 'person2', 1, 1, 2, 'person', '1', '1', true, true];
var filter = _.uniq(data);
console.log(filter);
console.log(_.isString(data));
console.log(_.isString('tushar'));
console.log(_.isString(false));
console.log(_.isString(true));