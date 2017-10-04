documentWidth = $(window).width();
gridContainerWidth = 0.92*documentWidth;
cellSideLength = 0.18*documentWidth;
cellSpace = 0.04*documentWidth;
var board = new Array();


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
		board[i][j] = num;
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
	setTimeout(function(){
		alert('你的得分是: '+score+' 分！');
	},200);
}
function updateScore(n){
	score += n;
	$('#score').text(score);
}