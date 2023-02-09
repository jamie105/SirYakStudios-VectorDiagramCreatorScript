const inquirer = require('inquirer');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas')

var colors = require('colors/safe');
var ui = new inquirer.ui.BottomBar();

var boardsize = [20000,20000]

const canvas = createCanvas(boardsize[0], boardsize[1])
const ctx = canvas.getContext('2d', {quality:'best',patternQuality:'best'})

const out = fs.createWriteStream('./test.png')
const stream = canvas.createPNGStream({quality:'best',patternQuality:'best'})
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))

var resultantvectorx = 0;
var resultantvectory = 0;

	ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, boardsize[0], boardsize[1]);
	ctx.lineWidth = 75
	ctx.strokeStyle = 'rgba(255,255,255,1)'
	ctx.beginPath()
	ctx.lineTo(boardsize[0]/2, 0)
	ctx.lineTo(boardsize[0]/2, boardsize[1])
	ctx.lineTo(boardsize[0]/2, boardsize[1]/2)
	ctx.lineTo(0, boardsize[1]/2)
	ctx.lineTo(boardsize[0], boardsize[1]/2)
	ctx.stroke()

function canvas_arrow(context, fromx, fromy, tox, toy, r){
	var x_center = tox;
	var y_center = toy;
	
	var angle;
	var x;
	var y;
	
	context.beginPath();
	
	angle = Math.atan2(toy-fromy,tox-fromx)
	x = r*Math.cos(angle) + x_center;
	y = r*Math.sin(angle) + y_center;
	x_center -= r * Math.cos(angle);
	y_center -= r * Math.sin(angle);
	context.moveTo(x, y);
	
	angle += (1/3)*(2*Math.PI)
	x = r*Math.cos(angle) + x_center;
	y = r*Math.sin(angle) + y_center;
	
	context.lineTo(x, y);
	
	angle += (1/3)*(2*Math.PI)
	x = r*Math.cos(angle) + x_center;
	y = r*Math.sin(angle) + y_center;
	
	context.lineTo(x, y);
	
	context.closePath();
	
	context.fill();
}

for(let i = 1; i < 1001; i++){
	var vectorx = boardsize[0]/2 - boardsize[0] + Math.floor(Math.random()*boardsize[0])
	var vectory = boardsize[1]/2 - boardsize[1] + Math.floor(Math.random()*boardsize[1])
	var angle = Math.floor(Math.random()*90)
	var quadrent = 'unknown'
	var arrowy = 0
	var arrowx = 0
	if(vectorx === 0){
		var random = Math.floor(Math.random())
		if(random === 0){vectorx = vectorx - 1}else if(random === 1){vectorx = vectorx + 1}
	}else if(vectory === 0){
		var random = Math.floor(Math.random())
		if(random === 0){vectory = vectory - 1}else if(random === 1){vectory = vectory + 1}
	}
	if(vectorx < 0 && vectory < 0){quadrent = 3; ctx.strokeStyle = 'rgba(0,255,0,1)'}
	else if(vectorx > 0 && vectory < 0){quadrent = 4; ctx.strokeStyle = 'rgba(200,255,0,1)'}
	else if(vectorx < 0 && vectory > 0){quadrent = 2; ctx.strokeStyle = 'rgba(0,100,255,1)'}
	else if(vectorx > 0 && vectory > 0){quadrent = 1; ctx.strokeStyle = 'rgba(255,50,0,1)'}
	
	ctx.lineWidth = 20
	ctx.beginPath()
	ctx.moveTo(boardsize[0]/2, boardsize[1]/2)
	ctx.lineTo(vectorx + boardsize[0]/2, vectory + boardsize[1]/2)
	ctx.stroke()
	canvas_arrow(ctx, boardsize[0]/2, boardsize[1]/2, vectorx + boardsize[0]/2, vectory + boardsize[1]/2, 25);
	ctx.stroke()
	
	resultantvectorx = resultantvectorx + vectorx;
	resultantvectory = resultantvectory + vectory;
	console.log(`> Vector ${i} <\nVector X : ${vectorx}N\nVector Y : ${vectory}N\nQuadrent : ${quadrent}\nResultant : ${Math.floor(Math.sqrt(vectory*vectory + vectorx*vectorx))}N\nAngle : ${angle}' | ${quadrent*90 - 90 + angle}'(360)\nPositionX : ${vectorx + boardsize[0]/2}\nPositionY : ${vectory +  + boardsize[1]/2}\n`)
}

ctx.strokeStyle = 'rgba(234,0,255,1)'
ctx.lineWidth = 70
ctx.beginPath()
ctx.moveTo(boardsize[0]/2, boardsize[1]/2)
ctx.lineTo(resultantvectorx + boardsize[0]/2, resultantvectory + boardsize[1]/2)
ctx.stroke()
canvas_arrow(ctx, boardsize[0]/2, boardsize[1]/2, resultantvectorx + boardsize[0]/2, resultantvectory + boardsize[1]/2, 100);
ctx.stroke()

console.log(`> RESULTANT VECTOR <\nVector X : ${resultantvectorx}N\nVector Y : ${resultantvectory}N\nQuadrent : 000\nResultant : ${Math.floor(Math.sqrt(resultantvectory*resultantvectory + resultantvectorx*resultantvectorx))}N\nAngle : 000' | 000'(360)\n`)
console.log("Saving Image To PNG...")
