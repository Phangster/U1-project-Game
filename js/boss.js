
var boss = { left:301, top:0 }

var missileBoss = [];

function aiMissile(){
	for (var i = 0; i< 2; i++){  //not sure what this does 
		missileBoss.push({
			left: boss.left + 94,
			top: boss.top + 140
		});
	drawBossMissile();
	}
	drawBoss();
}

function bossGetsHit(){
	// var elemBoss = document.getElementById("boss");
	for(var i = 0 ; i < missiles.length; i++){
		if(boss.left >= missiles[i].left && boss.left <= missiles[i].left + 200){
			missiles.splice(i,1);
			win=false;
			//hero ship loses
			if(win===false){
				alert('GAME OVER');
				location.reload();
			}
		}
	}	
}

//boss moving left and right
function drawBoss(){
	var elemBoss = document.getElementById("boss");
	// movement direction when finished moveing down = left
	var id = setInterval(function(){frame(elemBoss)}, 1);
	bossGetsHit();

}

var dir = 'left';
function frame(elem){
	if(boss.top<=100){
		boss.top++;
		elem.style.top = boss.top + "px";
	}else if(boss.top>100){
		if(dir == 'left') {
			boss.left++;
			elem.style.left = boss.left + "px";
		} else if(dir == 'right'){
			boss.left--;
			elem.style.left = boss.left + "px";
		}
		if(boss.left==0){
			dir = 'left';
		} else if (boss.left == 600) {
			dir = 'right';
		}
	}
}		

function moveBossMissile(){
	for(var i =0; i<missileBoss.length; i++){
		missileBoss[i].top = missileBoss[i].top + 20;
	}
}

function drawBossMissile(){
	document.getElementById("missilesBoss").innerHTML = "";
	for( var i = 0; i<missileBoss.length; i++){
		document.getElementById('missilesBoss').innerHTML += `<div class="missileBoss" style="left:${missileBoss[i].left}px; top:${missileBoss[i].top}px"></div>`;
	} 
}

function bulletBoss(){
	for(var a = 0; a<missileBoss.length; i++){
		if(missileBoss[a].top + 16 >= hero.top &&
		missileBoss[a].left <= hero.left + 50 &&
		missileBoss[a].left >= hero.left){
			win=false;
			//hero ship loses
			if(win===false){
				alert('GAME OVER');
				location.reload();
			}
		}
	}
}