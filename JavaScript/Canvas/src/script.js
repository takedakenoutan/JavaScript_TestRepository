var Circle = function(id, width, height){
	this.canvasSpaces = document.getElementById("canvasSpaces");
	this.imageSpaces = document.getElementById("imageSpaces");
	this.Canvas = document.createElement("canvas");
	this.Canvas.setAttribute("id", id);
	this.Canvas.setAttribute("width", width);
	this.Canvas.setAttribute("height", height);
	this.ctx = this.Canvas.getContext("2d");
};

Circle.prototype.drow = function(x, y, radius, disp, hex){
	if(disp === true){
		this.canvasSpaces.appendChild(this.Canvas);
	}
	this.ctx.beginPath();
	this.ctx.arc(x, y, radius, 0 , Math.PI * 2);
	this.ctx.closePath();
	let red = parseInt(hex.substr(1, 2), 16);
	let green = parseInt(hex.substr(3, 2), 16);
	let blue = parseInt(hex.substr(5, 2), 16);
	let rgb = "rgb(" + red + "," + green + "," + blue + ")";
	this.ctx.fillStyle = rgb;
	this.ctx.fill();
};

Circle.prototype.toImage = function(id){
	this.imageData = this.Canvas.toDataURL("image/png");
	this.Image = document.createElement("img");
	this.Image.setAttribute("id", id);
	this.Image.setAttribute("src", this.imageData);
	this.imageSpaces.appendChild(this.Image);
}