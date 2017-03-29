/*
Spriteコンストラクタ
canvasとそのコンテキストを取得
カウンタを初期化
*/
var Sprite = function(){
	this.canvas = document.getElementById("Sprite");
	this.ctx = this.canvas.getContext("2d");
	this.count = 0;
};

/*
createメソッド
isLoading : ロードのステータス
img : 画像の情報
*/
Sprite.prototype.create = function(img){
	this.isLoading = true;
	this.img = new Image();
	this.img.src = img;
	this.img.onload = (function(){
		this.isLoading = false;
	}).bind(this);
};

/*
animationメソッド
引数たち
loopFrame : コマの数
imgX, imgY : 切り取る画像の座標
width, height 画像サイズ
canvasX, canvasY : 描画する座標
type :{
	loop : ループ
	click : クリックで再描画
}
infinity : {
	true : 無限ループ
	false : コマ数描画して終了
}

callback :実際に描画する
*/
Sprite.prototype.animation = function(loopFrame, imgX, imgY, width, height, canvasX, canvasY, type, infinity){
	let callback = function(imgX, imgY, width, height, canvasX, canvasY){
		this.draw(imgX + (width * this.count), imgY, width, height, canvasX, canvasY);
		this.count += 1;
	};
	if(type === "loop"){
		(function loop(loopFrame, imgX, imgY, width, height, canvasX, canvasY, infinity){
			callback.call(this, imgX, imgY, width, height, canvasX, canvasY);
			if(this.count < loopFrame){
				requestAnimationFrame(loop.bind(this, loopFrame, imgX, imgY, width, height, canvasX, canvasY, infinity));
			}else if(this.count >= loopFrame && infinity === true){
				this.count = 0;
				requestAnimationFrame(loop.bind(this, loopFrame, imgX, imgY, width, height, canvasX, canvasY, infinity));
			}
		}).call(this, loopFrame, imgX, imgY, width, height, canvasX, canvasY, infinity);
	}else if(type === "click"){
		callback.call(this, imgX, imgY, width, height, canvasX, canvasY);
		this.canvas.addEventListener("click", (function(event){
			let range = event.target.getBoundingClientRect();
			let clickX = event.clientX - range.left;
			let clickY = event.clientY - range.top;
			if((clickX > canvasX && clickY > canvasY) && (clickX < (canvasX + width) && clickY < (canvasY + height))){
				if(this.count < loopFrame){
					callback.call(this, imgX, imgY, width, height, canvasX, canvasY);
				}else if(this.count >= loopFrame && infinity === true){
					this.count = 0;
					callback.call(this, imgX, imgY, width, height, canvasX, canvasY);
				}
			}
		}).bind(this), false);
	}
};

Sprite.prototype.draw = function(imgX, imgY, width, height, canvasX, canvasY){
	if(this.isLoading === undefined){
		return false;
	}else if(this.isLoading === true){
		setTimeout(this.draw.bind(this, imgX, imgY, width, height, canvasX, canvasY, width, height), 100);
		return false;
	}else if(this.isLoading === false){
		this.ctx.clearRect(canvasX, canvasY, width, height);
		this.ctx.drawImage(this.img, imgX, imgY, width, height, canvasX, canvasY, width, height);
	}
};

window.addEventListener("load", function(){
	var loadTakedake = new Sprite();
	loadTakedake.create("src/img/128_20_new.png");
	loadTakedake.animation(20, 0, 0, 128, 128, 176, 76, "loop", true);
}, false);

window.addEventListener("error", function(error){
	alert(error.message);
}, false);