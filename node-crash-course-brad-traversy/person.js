// creating an object of a person
const person = {
    name : 'James Bond',
    age : 47
}

// exporting person so that that it can be used from external.
// module.exports = person; //for exporting object

//exporting class
class Car {
    constructor(brandName,type){
        this.brandName = brandName,
        this.type = type
    }

    tagline(){
        console.log(`My car is ${this.brandName} and its for ${this.type}`);
    }
}

module.exports = Car;