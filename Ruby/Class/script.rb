class Person
	def initialize (name = "Unknown", age = 0)
		@name = name
		@age = age
	end
	
	def getName
		return @name
	end
	
	def getAge
		return @age
	end
end

Takeshi = Person.new "Takeshi", 32
puts "#{Takeshi.getName} : #{Takeshi.getAge}"