// console.log('hello world from node js');

// importing object from external module
const Car = require('./person');//importing class from another file.
// const myPerson = require('./person');

// console.log(myPerson.name);

//importing class from another file.
const myCar = new Car('BMW','sports'); //this is class instantiating
myCar.tagline();
