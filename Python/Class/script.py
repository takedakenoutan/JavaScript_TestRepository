class Person :
	def __init__ (self, name, age) :
		self.name = name
		self.age = age
	
	def getName (self) :
		return self.name
	
	def getAge (self) :
		return self.age
		
Takeshi = Person("Takeshi", 32)
print(Takeshi.getName() + " : " + str(Takeshi.getAge()))