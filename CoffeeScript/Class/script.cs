class Person
	name = "Unknown"
	age = 0
	
	constructor : (name, age) ->
		@name = name
		@age = age
	
	getName : ->
		@name
	
	getAge : ->
		@age

Takeshi = new Person "Takeshi", 32
console.log "#{Takeshi.getName()} : #{Takeshi.getAge()}"