//declare the var that you will be changing, this is drawn from the Style part.
window.onload = function(){
var hero = {
	top:700,
	left:380
};

var missiles = [];


// var enemies = [{left:null, top:null}];
var enemies =
[{left:180, top:100},
{left:280, top:100},
{left:380, top:100},
{left:480, top:100},
{left:580, top:100},
{left:180, top:175},
{left:280, top:175},
{left:380, top:175},
{left:480, top:175},
{left:580, top:175}];

var scoreBoard = 0;

document.onkeydown = function(e){
	// console.log(e.keyCode);

/* ###FOR LEFT AND RIGHT### */

	if(e.keyCode===37){
		// console.log('LEFT');
		hero.left = hero.left - 10;
		drawHero();
	}else if(e.keyCode===39){
		// console.log('RIGHT');
		hero.left = hero.left + 10;
		drawHero();

/* ###FOR UP AND DOWN### */	

	// }else if(e.keyCode===40){
	// 	console.log('TOP');
	// 	hero.top = hero.top + 10;
	// 	moveHeroUD();
	// }else if(e.keyCode===38){
	// 	console.log('BOTTOM');
	// 	hero.top = hero.top + 10;
	// 	moveHeroUD();

/* ###SPACE BAR### */	

	}else if(e.keyCode===32){
		// console.log('FIRE');
		missiles.push({
			left: hero.left + 20,
			top: hero.top - 15
		});
		drawMissiles();
	}
	drawHero();
}

function drawHero(){
	var idHero = document.getElementById("hero");
	idHero.style.left = hero.left + "px";
	idHero.style.top = hero.top + "px";
}
// function moveHeroUD(){
// 	var getHero = document.getElementById("hero");
// 	getHero.style.top = hero.top + "px";
// }

function moveMissile(){
	for(var i =0; i<missiles.length; i++){
		missiles[i].top = missiles[i].top - 20;
	}
}

function drawMissiles() {
    document.getElementById('missiles').innerHTML = "";
    for(var i = 0 ; i < missiles.length ; i++ ) {
        document.getElementById('missiles').innerHTML += `<div class='missile' style='left:${missiles[i].left}px; top:${missiles[i].top}px'></div>`;
    }
}
//creating random bots
// function randomEnemies(){
// 	for(var z = 0; z < 15; i++){
// 		//create a random number
// 		var randLeft = Math.floor(Math.random()*800)+1;
// 		var randTop = Math.floor(Math.random()*800)+1;
// 		//tag it to the left and top
// 		enemies[z].left = randLeft;
// 		enemies[z].top = randTop;
// 		//append to the array
// 		z++;
// 	}
// }

function moveEnemies(){
	for(var i =0; i<enemies.length; i++){
		enemies[i].top = enemies[i].top + 3; //represents how fast the enemies comes down the screen each second.
	}
}
function drawEnemies(){
	document.getElementById("enemies").innerHTML="";
	for(var i=0; i<enemies.length; i++){
		document.getElementById("enemies").innerHTML +=`<div class='enemy' style='left:${enemies[i].left}px ; top:${enemies[i].top}px'></div>`
	}
}
var win=null;
function hitTarget(){
	drawMissiles();
	for(var k =0; k<missiles.length; k++){
		for(var x =0; x<enemies.length; x++){
			// console.log(missiles);
			// console.log(enemies);
			if(
			missiles[k].left <= enemies[x].left + 50 &&
			missiles[k].left >= enemies[x].left && 
			missiles[k].top<= enemies[x].top + 50  &&
            missiles[k].top >= enemies[x].top
            ){
				enemies.splice(x,1);
				missiles.splice(k,1);
				scoreBoard += 1;
				summonBoss();
			}
			if(missiles[k].left <= boss.left + 200 &&
			missiles[k].left >= boss.left && 
			missiles[k].top<= boss.top + 200  &&
            missiles[k].top >= boss.top
            ){
				missiles.splice(k,1);
				boss.top = 100;
				win=false;
				if(win===false){
					alert('CONGRATULATIONS, YOU HAVE WON THE INVADERS, EARTH THANKS YOU FOR YOUR SERVICE');
					location.reload();///able to hit boss, how to delay it ?
				}
			}
		}
	}
	document.getElementById('newScore').innerHTML= scoreBoard;
}

//collision of missiles and enemy lose game

function onColision(){
	for(var i=0; i<enemies.length; i++){
	//get the current loctation of the enemy ship
	// clearAll();		//unable to clear the game
	//if it === to the hero ship
		if(
		(enemies[i].top >= hero.top &&
		enemies[i].left <= hero.left + 50 &&
		enemies[i].left >= hero.left) || 
		enemies[i].top >= 800)
		{
			win=false;
			//hero ship loses
			if(win===false){
				alert('GAME OVER');
				location.reload();
			}
		}
	}
}

function summonBoss(){ //boss will be summon after all enemies are killed
	if(scoreBoard==10){
		document.getElementById("boss").style.visibility = 'visible';
		drawBoss();
	}	
}
// limit to the screen for both bullets and the ship === use overflow-y: hidden;

function gameLoop(){
	setTimeout(gameLoop,100);
	moveMissile();
	drawEnemies();
	moveEnemies();
	onColision();
	// gameWin();
	hitTarget();
	// randomEnemies();
	// aiMissile();
	// drawBossMissile();
	// moveBossMissile();
	// bulletBoss();
}
gameLoop()
}
