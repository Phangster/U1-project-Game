//declare the var that you will be changing, this is drawn from the Style part.
window.onload = function(){
var hero = {
	top:700,
	left:380
};

var missiles = [];

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

/* ###FOR LEFT AND RIGHT### */

	if(e.keyCode===37){
		hero.left = hero.left - 10;
		drawHero();
	}else if(e.keyCode===39){
		hero.left = hero.left + 10;
		drawHero();

/* ###SPACE BAR### */	

	}else if(e.keyCode===32){
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
var bossUp = false;

function hitTarget(){
	drawMissiles();
	for(var k =0; k<missiles.length; k++){
		for(var x =0; x<enemies.length; x++){
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
		}
		if(bossUp){
			bossCollision(k);
		}
	}
	document.getElementById('newScore').innerHTML= scoreBoard;
}

//collision of missiles and enemy lose game

function onColision(){
	for(var i=0; i<enemies.length; i++){
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
		document.getElementById("health").style.visibility = 'visible';
		document.getElementById("hp").style.visibility = 'visible';
		drawBoss();
		bossUp = true;
	}	
}

var enemyHealth = 0;
var width = 190;
function bossCollision(k){

	if(missiles[k].left <= boss.left + 200 &&
	missiles[k].left >= boss.left && 
	missiles[k].top<= boss.top + 200  &&
    missiles[k].top >= boss.top
    ){
		missiles.splice(k,1);
		enemyHealth += 1;
		var foo = document.getElementById("hp");
		width -= 20;
		foo.style.width = width + 'px';
		if(enemyHealth==10){
			win=false;
			if(win===false){
				alert('CONGRATULATIONS, YOU HAVE WON THE INVADERS, EARTH THANKS YOU FOR YOUR SERVICE');
				location.reload();
			}
		}
	}
}

var cnt=30;

function timedCount(){
	setInterval(function () {
        cnt--;
        if(cnt == 0){
        	alert('GAME OVER');
			location.reload();
        }
        document.getElementById("txt").innerHTML = "Time: " + cnt;
    }, 1000);
}
// limit to the screen for both bullets and the ship === use overflow-y: hidden;

function gameLoop(){
	setTimeout(gameLoop,100);
	moveMissile();
	drawEnemies();
	moveEnemies();
	onColision();
	hitTarget();
}
timedCount();
gameLoop()
}
