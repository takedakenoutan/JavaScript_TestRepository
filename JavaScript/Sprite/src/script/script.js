/**
 * @fileoverview スプライトオブジェクトをつくるためのJavaScript
 */

/**
 * スプライトオブジェクトを作るクラス
 * メンバ変数の初期化を行う
 * @constructor
 * @param {string} id htmlのcanvasタグのID
 */

var Sprite = function(id){
	/** @type {?EventTarget}*/
	this.canvas = document.getElementById(id);
	if(this.canvas === null){
		throw new Error(id + "is not found.");
	}
	/** @type {?Object} */
	this.ctx = this.canvas.getContext("2d");
	/** @type {?number} */
	this.count = null;
	/** @type {?isLoading} */
	this.isLoading = null;
	/** @type {?EventTarget} */
	this.img = null;
};

/**
 * スプライト画像から画像オブジェクトを作るメソッド
 * @param {string} img スプライト画像のパス
 */

Sprite.prototype.create = function(img){
	this.isLoading = true;
	this.img = new Image();
	this.img.addEventListener("load", (function(){
		this.isLoading = false;
	}).bind(this), false);
	this.img.addEventListener("error", (function(){
		this.isLoading = null;
		throw new Error(img + " is not Image.");
	}).bind(this), false);
	this.img.src = img;
};

/**
 * アニメーションを動かすメソッド
 * @param {number} loopFrame ループフレームの数
 * @param {number} imgX 切り取る画像のX座標
 * @param {number} imgY 切り取る画像のY座標
 * @param {number} width 表示する画像の横幅
 * @param {number} height 表示する画像の縦幅
 * @param {number} canvasX 画像を表示するX座標
 * @param {number} canvasY 画像を表示するY座標
 * @param {string} type アニメーションのタイプ
 * @param {boolean} infinity 無限か否か
 */

Sprite.prototype.animation = function(loopFrame, imgX, imgY, width, height, canvasX, canvasY, type, infinity){
	this.count = 0;
	if(loopFrame < 1){
		throw new Error("loopFrame is more than 0.");
	}else if(type !== "loop" && type !== "click"){
		throw new Error("type is 'loop' or 'click'");
	}else if((typeof infinity) !== "boolean"){
		throw new Error("infinity is boolean");
	}
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

/**
 * 実際に描画するメソッド
 * @param {number} imgX 切り取る画像のX座標
 * @param {number} imgY 切り取る画像のY座標
 * @param {number} width 表示する画像の横幅
 * @param {number} height 表示する画像の縦幅
 * @param {number} canvasX 画像を表示するX座標
 * @param {number} canvasY 画像を表示するY座標
 */

Sprite.prototype.draw = function(imgX, imgY, width, height, canvasX, canvasY){
	if(imgX < 0){
		throw new Error("imgX is more than 0.");
	}else if(imgY < 0){
		throw new Error("imgY is more than 0.");
	}else if(width < 1){
		throw new Error("width is more than 0.");
	}else if(height < 1){
		throw new Error("height is more than 0.");
	}else if(canvasX < 0){
		throw new Error("canvasX is more than 0.");
	}else if(canvasY < 0){
		throw new Error("canvasY is more than 0.");
	}
	if(this.isLoading === null){
		throw new Error("this object must do create.");
	}else if(this.isLoading === true){
		setTimeout(this.draw.bind(this, imgX, imgY, width, height, canvasX, canvasY, width, height), 100);
		return;
	}else if(this.isLoading === false){
		this.ctx.clearRect(canvasX, canvasY, width, height);
		this.ctx.drawImage(this.img, imgX, imgY, width, height, canvasX, canvasY, width, height);
	}
};

window.addEventListener("load", function(){
	var loadTakedake = new Sprite("Sprite");
	loadTakedake.create("src/img/128_20_new.png");
	loadTakedake.animation(20, 0, 0, 128, 128, 176, 76, "loop", true);
}, false);

window.addEventListener("error", function(error){
	alert(error.message);
}, false);