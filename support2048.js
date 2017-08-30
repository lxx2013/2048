documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;
var board = new Array();

function getNumberBackgroundColor(number) {
	switch (number) {
		case 2:
			return '#eee4da';
			break;
		case 4:
			return '#ede0c8';
			break;
		case 8:
			return '#f2b179';
			break;
		case 16:
			return '#f59563';
			break;
		case 32:
			return '#f67c5f';
			break;
		case 64:
			return '#f65e3b';
			break;
		case 128:
			return '#edcf72';
			break;
		case 256:
			return '#edcc61';
			break;
		case 512:
			return '#9c0';
			break;
		case 1024:
			return '#33b5e5';
			break;
		case 2048:
			return '#09c';
			break;
		case 4096:
			return '#a6c';
			break;
		case 3192:
			return '#93c';
			break;
		default:
			return 'black';
			break;
	}
}

function getNumColor(number) {
	if (number <= 4) {
		return '#776e65';
	}
	return 'white';
}

function generateOneNumber() {
	var count = CountZero(board);
	if (!count) {
		return false;
	} else {
		//随机一个位置
		var pos = ~~(Math.random() * count);
		var i, j,flag = 0;
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					if (pos == 0) {
						flag = 1;
						break; //跳出循环时board[i][j]就是随机出来的位置
					}
					pos--;
				}
			}
			if (flag == 1)
				break;
		}
		//随机一个数字
		var num = Math.random() < 0.5 ? 2 : 4;
		//显示数字
		showNumberWithAnimation(i, j, num);
	}
}

function CountZero(board) {
	var count = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0)
				count++;
		}
	}
	return count;
}

function canMoveLeft() {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
					return true;
			}
		}
	}
	return false;
}
function canMoveRight() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 3; j++) {
			if (board[i][j] != 0) {
				if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
					return true;
			}
		}
	}
	return false;
}
function canMoveUp() {
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j])
					return true;
			}
		}
	}
	return false;
}
function canMoveDown() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true;
			}
		}
	}
	return false;
}
var AddCount = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
function noObstacle(i,k,t,j){
	if(AddCount[i][k] == 1){
		return false;
	}
	//return true;
	if(i==t && k<j){
		for(var u = k+1;u<j;u++){
		if(board[i][u] != 0)
			return false;
		}
	}
	if(i==t && k>j){
		for(var u = k-1;u>j;u--){
		if(board[i][u] != 0)
			return false;
		}
	}
	if(k==j && i<t){
		for(var u = i+1;u<t;u++){
		if(board[u][k] != 0)
			return false;
		}
	}
	if(k==j && i>t){
		for(var u = t+1;u<i;u++){
		if(board[u][k] != 0)
			return false;
		}
	}
	AddCount[i][k] = 1;
	return true;
}
function isGameOver(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] == 0)
				return false;
		}
	}
	if(canMoveLeft() || canMoveRight() || canMoveUp() ||canMoveDown())
		return false;
	gameOver();
	return true;
}
function gameOver(){
	alert('你的得分是: '+score+' 分！');
}
function updateScore(n){
	score += n;
	$('#score').text(score);
}