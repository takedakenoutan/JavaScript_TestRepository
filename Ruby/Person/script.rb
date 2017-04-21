def say(arg = nil)
	if arg == nil then
		return
	end
	arg.each do |name|
		puts "Hello #{name}!"
	end
end

array = ["Takeshi", "Masashi", "Nobita"]
say array