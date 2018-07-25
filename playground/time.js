var moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());

var someTimestamp = moment().value();

var createdAt = 1234;
var date = moment(createdAt);
// date.add(1, 'y').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));


// 10:35 am
date.subtract(3, 'h')
console.log(date.format('h:mm a'))
