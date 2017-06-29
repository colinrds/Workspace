require('../css/index.css');

class Person {
    constructor(name) {
        this.name = name;
    }
    static say () {
        console.log("index hi");
    }
};

Person.say();