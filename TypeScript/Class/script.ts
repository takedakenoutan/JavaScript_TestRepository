class Person {
	private name : string = "Unknown";
	private age : number = 0;
	
	constructor (name : string, age : number) {
		this.name = name;
		this.age = age;
	}
	
	public getName () : string {
		return this.name;
	}
	
	public getAge () : number {
		return this.age;
	}
}

var Takeshi = new Person("Takeshi", 32);
console.log(Takeshi.getName() + " : " + Takeshi.getAge());