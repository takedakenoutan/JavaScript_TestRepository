var Person = (function () {
    function Person(name, age) {
        this.name = "Unknown";
        this.age = 0;
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    return Person;
}());
var Takeshi = new Person("Takeshi", 32);
console.log(Takeshi.getName() + " : " + Takeshi.getAge());
