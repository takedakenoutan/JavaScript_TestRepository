def say(arg = None):
	if arg is None:
		return
	for name in arg:
		print("Hello " + name + "!")

array = ["Takeshi", "Masashi", "Nobita"]
say(array)
