
var boss = { left:301, top:0 }
var health = { left:301 , top:0 }

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

//boss moving left and right
function drawBoss(){
	var elemBoss = document.getElementById("boss");
	var healthBoss = document.getElementById("health");
	// movement direction when finished moveing down = left
	var id = setInterval(function(){frame(elemBoss,healthBoss)}, 1);
}

var dir = 'left';
function frame(elem,hp){
	if(boss.top<=110 && health.top<=110){
		boss.top++;
		health.top++;
		elem.style.top = boss.top + "px";
		hp.style.top = health.top + "px";

	}else if(boss.top>100 && health.top>100){
		if(dir == 'left') {
			boss.left++;
			health.left++;
			elem.style.left = boss.left + "px";
			hp.style.left = health.left + "px";
		} else if(dir == 'right'){
			boss.left--;
			health.left--;
			elem.style.left = boss.left + "px";
			hp.style.left = health.left + "px";
		}
		if(boss.left==0 && health.left==0){
			dir = 'left';
		} else if (boss.left == 600 && health.left == 600) {
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