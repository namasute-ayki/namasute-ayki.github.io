var correction = [
	[10.0, 7.5, 5.5, 4.0, 3.6],
	[4.3, 4.0, 3.2, 2.6, 2.0],
	[2.8, 2.4, 2.1, 1.75, 1.5],
	[2.0, 1.8, 1.6, 1.4, 1.2]
];

var stage = [
	5900, 6633, 7367, 8100, 14419,
	20738, 27056, 33375, 37825, 44500,
	46725, 68989, 91232, 114277, 136333,
	158388, 180444, 202500, 229500, 270000,
	283500, 309429, 335357, 361286, 387214,
	413143, 439071, 465000, 539000, 613000,
	910000, 955500, 1096250, 1237000, 1377750,
	1518500, 1659250, 1800000, 2040000, 2400000,
	2520000, 2655000, 2790000, 2925000, 3060000,
	3195000, 3330000, 3465000, 4050000, 4500000
]

var teamList = ['first', 'second', 'third'];
var notBDCount = [0, 0, 0];

function setup() {
	for(key in teamList) {
		var notBDCount = 0;
		var container = document.createElement('div');
		container.id = teamList[key];
		for(var i = 0; i < 5; i++) {
			var cardDiv = document.createElement('div');
			cardDiv.className = 'card';
			
			var numInput = document.createElement('input');
			numInput.type = 'number';
			numInput.onchange = function(){
				statusCheck();
			};
			cardDiv.appendChild(numInput);
			
			var rareSelect = document.createElement('select');
			rareSelect.className = 'rare';
			rareSelect.onchange = function() {
				statusCheck();
			}
			
			for(var j = 0; j < 5; j++) {
				var rareOption = document.createElement('option');
				switch (j) {
					case 0:
						rareOption.innerHTML = 'SSR';
						break;
					case 1:
						rareOption.innerHTML = 'SR';
						break;
					case 2:
						rareOption.innerHTML = 'R';
						break;
					case 3:
						rareOption.innerHTML = 'N';
						break;
					case 4:
					rareOption.innerHTML = 'BDキャラ以外';
					break;
				}
				rareSelect.appendChild(rareOption);
			}
			cardDiv.appendChild(rareSelect);
			
			var awakingSelect = document.createElement('select');
			awakingSelect.className = 'awaking';
			awakingSelect.onchange = function(){
				statusCheck();
			};

			for(var j = 0; j < 6; j++) {
				var awakingOption = document.createElement('option');
				switch (j) {
					case 0:
						awakingOption.innerHTML = '++++';
						break;
					case 1:
						awakingOption.innerHTML = '+++';
						break;
					case 2:
						awakingOption.innerHTML = '++';
						break;
					case 3:
						awakingOption.innerHTML = '+';
						break;
					case 4:
						awakingOption.innerHTML = '未凸';
						break;
					case 5:
						awakingOption.innerHTML = 'BDキャラ以外'
						break;
				}
				awakingSelect.appendChild(awakingOption);
			}
			cardDiv.appendChild(awakingSelect);
			
			var label = document.createElement('label');
			var checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.id = teamList[key] + i; 
			label.appendChild(checkbox);
			label.innerHTML += 'BD2020';
			//なぜ動くか分からんonchange
			label.onchange = function(){
				statusCheck();
			};
			cardDiv.appendChild(label);
			
			var span = document.createElement('span');
			var div = document.createElement('div');
			div.innerHTML = '∟特効込：';
			div.appendChild(span);
			cardDiv.appendChild(div);
			container.appendChild(cardDiv);
		}
		var p = document.createElement('p');
		p.innerHTML = 'カードスキル：';
		var cardSkill = document.createElement('select');
		cardSkill.id = teamList[key]+'Skill';
		cardSkill.onchange = function(){
			statusCheck();
		};
		for(var i = 0; i < 8; i++) {
			var cardSkillOption = document.createElement('option');
			switch (i) {
				case 0:
					cardSkillOption.innerHTML = '5%';
					cardSkillOption.value = 1.05;
					break;
				case 1:
					cardSkillOption.innerHTML = '10%';
					cardSkillOption.value = 1.1;
					break;
				case 2:
					cardSkillOption.innerHTML = '15%';
					cardSkillOption.value = 1.15;
					break;
				case 3:
					cardSkillOption.innerHTML = '20%';
					cardSkillOption.value = 1.2;
					break;
				case 4:
					cardSkillOption.innerHTML = '25%';
					cardSkillOption.value = 1.25;
					break;
				case 5:
					cardSkillOption.innerHTML = '30%';
					cardSkillOption.value = 1.3;
					break;
				case 6:
					cardSkillOption.innerHTML = '35%';
					cardSkillOption.value = 1.35;
					break;
				case 7:
					cardSkillOption.innerHTML = '40%';
					cardSkillOption.value = 1.4;
					break;
			}
			cardSkill.appendChild(cardSkillOption);
		}
		p.appendChild(cardSkill);
		container.appendChild(p);

		var teamTotal = document.createElement('span');
		teamTotal.id = teamList[key]+'Team';
		teamTotal.innerHTML = '班の合計値：';
		container.appendChild(teamTotal);
		document.getElementById('container').appendChild(container);
	}
}

function statusCheck() {
	notBDCount = [0, 0, 0];
	var teamTotal = [];
	var linkSkill = [2.2, 1.8, 1.5, 1.2, 1, 1];
	for(key in teamList) {
		var teamNode = document.getElementById(teamList[key]);
		var skillNode = document.getElementById(teamList[key]+'Skill');
		var skillIndex = skillNode.selectedIndex;
		var skillValue = skillNode.getElementsByTagName('option')[skillIndex].value;
		teamTotal[key] = parseFloat(card(teamNode, key) * skillValue * linkSkill[notBDCount[key]]);
		//console.log('BD以外：'+notBDCount+' リンスキ'+linkSkill[notBDCount[key]]);
		document.getElementById(teamList[key]+'Team').innerHTML = '班の合計値：' + Math.ceil(teamTotal[key]);
	
	}
	var sp1 = Math.ceil(teamTotal[0]);
	var sp2 = Math.ceil(parseFloat((teamTotal[0] + teamTotal[1]) * 1.5));
	var sp3 = Math.ceil(parseFloat(teamTotal.reduce((prev,next) => prev+=next) * 2));
	var bonus = Math.ceil(parseFloat(sp3 * 1.2));
	
	for(i = 0; i < 50; i++) {
		if(stage[i] < sp1) {
			document.getElementById('sp1stage').innerHTML = i+1;
			if(i == 49) {
				document.getElementById('sp1stage').innerHTML += '🎉';
			}
		}
		if(stage[i] < sp2) {
			document.getElementById('sp2stage').innerHTML = i+1;
			if(i == 49) {
				document.getElementById('sp2stage').innerHTML += '🎉';
			}
		}
		if(stage[i] < sp3) {
			document.getElementById('sp3stage').innerHTML = i+1;
			if(i == 49) {
				document.getElementById('sp3stage').innerHTML += '🎉';
			}
		}
		if(stage[i] < bonus) {
			document.getElementById('bonusStage').innerHTML = i+1;
			if(i == 49) {
				document.getElementById('bonusStage').innerHTML += '🎉';
			}
		}
	}
	
	document.getElementById('sp1').innerHTML = sp1;
	document.getElementById('sp2').innerHTML = sp2;
	document.getElementById('sp3').innerHTML = sp3;
	document.getElementById('bonus').innerHTML = bonus;
}

function card(team, key) {
	var card = team.getElementsByClassName('card');
	var totalArray = []
	var correctedNum = 0;
	for(i=0; i<5; i++) {
		correctedNum = 0;
		var cardPow = card[i].getElementsByTagName('input')[0].value;
		var rareNum = card[i].getElementsByClassName('rare')[0].selectedIndex;
		var awakingNum = card[i].getElementsByClassName('awaking')[0].selectedIndex;
			if(rareNum != 4 && awakingNum != 5 ) {
				correctedNum = Math.ceil(parseFloat(cardPow * correction[rareNum][awakingNum]));
				var target = document.getElementById(team.id + i).checked;
				if(target==1) {
					correctedNum = correctedNum * 2;
				}
			} else {
				correctedNum += Math.ceil(parseFloat(cardPow));
				console.log(correctedNum);
				notBDCount[key]++;
			}
		card[i].getElementsByTagName('span')[0].innerHTML = correctedNum;
		
		totalArray.push(correctedNum);	
		
	} 
	return totalArray.reduce((prev,next) => prev+=next);
}
