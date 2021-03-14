function say(arg){
	if(arg === undefined){
		return;
	}
	for(var value of arg){
		console.log("Hello " + value + "!");
	}
}

var array = ["Takeshi", "Masashi", "Nobita"];
say(array);
