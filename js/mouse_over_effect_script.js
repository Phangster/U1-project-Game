// // ### Canvas Starter Code, every canvas must have to make the process easier 

var canvas = document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height= window.innerHeight;
//creating objects 2 dimentional in canvas
var c = canvas.getContext('2d');

// // ### HOW TO CREATE A BOX/BOXES

// /*c.fillRect(x,y,width,height);*/
// c.fillStyle= "blue";     //filling the color for the box
// c.fillRect(30,50,30,50);

// //To create multiple boxes, just copy paste.
// c.fillStyle= "orange";
// c.fillRect(100,50,20,20);
// c.fillStyle= "yellow";
// c.fillRect(60,70,20,20);

// // ###DRAWING OF A LINE
// c.beginPath();
// c.moveTo(50,300);        //start from
// c.lineTo(300,100);       //move to from start
// c.lineTo(400,300);
// c.strokeStyle="green";   //filling the color fo the line
// c.stroke();

// // DRAWING OF AN  ARC/ CIRCLE
// /*c.arc(x: Int, y: Int, r: Int, startAngle:Float, endAngle: 2*Math.PI);*/

// //	randomising the circles

// var refresh = function(){
// 	for(i=0; i<600; i++){
// 		var x = Math.floor(Math.random()*innerWidth);
// 		var y = Math.floor(Math.random()*innerHeight);
// 		var radius = Math.floor(Math.random()*20);
	
// 		var r = Math.floor(Math.random()*255);
// 		var b = Math.floor(Math.random()*225);
// 		var g = Math.floor(Math.random()*225);

// 		c.beginPath();
// 		// c.arc(x,y,radius,Math.PI*2,0,false); //for circle
// 		c.fillRect(x,y,20,20);
// 		c.fillStyle="rgba("+r+","+g+","+b+",1)";
// 		c.fill();
// 		c.closePath();
// 	}
// }

// refresh();

// ### CREATING A CICRLE ANIMATION BOUNCING AROUND THE PAGE
var mouse = {
	x: undefined,
	y: undefined,
}
//max radius and min radius that the circle can go
var maxRadius=40;
// var minRadius=2;
//Create a random color to show each time
var colorArray=['blue','black','orange','red','white'];

window.addEventListener('mousemove',function(event){
	mouse.x=event.x;
	mouse.y=event.y;
	//distance of the mouse when mouse over
	// console.log(mouse.x);
	// console.log(mouse.y);
})

function Circle(x,y,dx,dy,radius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.minRadius=radius;
	this.color=colorArray[Math.floor(Math.random()*colorArray.length)];

	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0, Math.PI*2, false);
		c.fillStyle = this.color;
		c.fill();
	}
	this.update = function(){
		if(this.x + this.radius>innerWidth || this.x - radius < 0){
			this.dx = -this.dx;
		}
		if(this.y + this.radius>innerHeight || this.y - radius < 0){
			this.dy = -this.dy;	
		}
		this.x+=this.dx;
		this.y+=this.dy;

		//interactivity
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.radius<maxRadius){
				this.radius +=1;
			}
		}else if(this.radius>this.minRadius){
			this.radius -=1;
		}

		this.draw();
	}
}

var circleArray=[];
for(var i=0;i<1500;i++){
	var radius = Math.random() * 3 + 1; //random number from 1 to 4
	var x = Math.random() * (innerWidth-radius*2) + radius;
	var y = Math.random() * (innerHeight-radius*2) + radius;
	var dy= (Math.random() - 0.5) * 2;
	var dx= (Math.random() - 0.5) * 2; //2 is the speed
	circleArray.push(new Circle(x,y,dx,dy,radius));
}

// console.log(circleArray); //see the location of different circle

var circle = new Circle(200,200,3,3,30);

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0 , 0 , innerWidth, innerHeight); // to clear everytime before start so it can look like it's moving.
	for (var i=0;i<circleArray.length;i++){
		circleArray[i].update();
	};
}
circle.update();
animate();

