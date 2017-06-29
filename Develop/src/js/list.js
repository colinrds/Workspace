require('../css/list.css');

class Person {
    constructor(name) {
        this.name = name;
    }
    static say () {
        console.log("list hi");
    }
};

Person.say();