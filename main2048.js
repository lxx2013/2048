var score = 0;
$(document).ready(function () {
	prepareMobile();
	newgame();
})

function newgame() {
	//初始化棋盘格
	init();
	//随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}
function GetBack(){
	if(boardBackList.length == 0){
		return;
	}
	var back = boardBackList.pop();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			board[i][j] = back[i][j];
		}
	}
	updateBoardView();
}
var score = 0;
function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-" + i + '-' + j);
			gridCell.css({
				top: getposTop(i, j),
				left: getposLeft(i, j)
			});
		}
	}
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
		}
	}
	score = 0;
	updateBoardView();
}
function getposTop(i, j) {
	return i * (cellSideLength+cellSpace) + cellSpace;
}
function getposLeft(i, j) {
	return j * (cellSideLength+cellSpace) + cellSpace;
}
function updateBoardView() {
	AddCount = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '">'+board[i][j]+'</div>');
			var theNumberCell = $('#number-cell-' + i + '-' + j);

			if (board[i][j] == 0) {
				theNumberCell.css({
					width: 0,
					height: 0,
					top:getposTop(i,j),
					left:getposLeft(i,j)
				});
			} else {
				theNumberCell.css({
					width: cellSideLength,
					height: cellSideLength,
					fontSize:board[i][j]>=1024?cellSideLength*0.4:cellSideLength*0.6,
					top: getposTop(i, j),
					left: getposLeft(i, j),
					backgroundColor: getNumberBackgroundColor(board[i][j]),
					color:getNumColor(board[i][j]),
					lineHeight:cellSideLength+'px'
				})
			}
		}
	}
}

var boardBack = new Array();
var boardBackList = new Array();
$(document).keydown(function(event){
	if([37,38,39,40].indexOf(event.keyCode)!=-1 ){
		boardBack = new Array();
		for(var i in board){
			boardBack[i] = board[i].slice(0);
		}
	}
	event.preventDefault();
	switch(event.keyCode){
		case 37: //left
			if(moveLeft()){
				boardBackList.push(boardBack);
				generateOneNumber();
				isGameOver();
			}
			break;
		case 38: //up
			if(moveUp()){
				boardBackList.push(boardBack);
				generateOneNumber();
				isGameOver();
			}
			break;
		case 39: //right
			if(moveRight()){
				boardBackList.push(boardBack);
				generateOneNumber();
				isGameOver();
			}
			break;
		case 40: //down
			if(moveDown()){
				boardBackList.push(boardBack);
				generateOneNumber();
				isGameOver();
			}
			break;
		default:
			break;
	}
});
var t1,t2;
$(document).bind('touchstart',function(event){
	t1 = event.originalEvent.touches[0];
});
var isTouchMoving = 0;
$(document).bind('touchmove',function(event){
	event.preventDefault();
	t2 = event.originalEvent.changedTouches[0];
	if(Math.abs(t1.pageX-t2.pageX)<0.2*documentWidth&&Math.abs(t1.pageY-t2.pageY)<0.2*documentWidth){
		return;
	}
	if(isTouchMoving == 1){return;}
	isTouchMoving = 1;
	if(Math.abs(t1.pageX-t2.pageX) > Math.abs(t1.pageY-t2.pageY)){
		//x
		if(t1.pageX<t2.pageX){
			var e = $.Event('keydown');
			e.keyCode = 39;
			$(document).trigger(e);
		}
		else{
			var e = $.Event('keydown');
			e.keyCode = 37;
			$(document).trigger(e);
		}
	}
	else{
		//y
		if(t1.pageY<t2.pageY){
			var e = $.Event('keydown');
			e.keyCode = 40;
			$(document).trigger(e);
		}
		else{
			var e = $.Event('keydown');
			e.keyCode = 38;
			$(document).trigger(e);
		}
	}
});
$(document).bind('touchend',function(event){
	isTouchMoving = 0;
});
function moveLeft(){
	if(!canMoveLeft())
		return false;
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j] != 0){
				for(var k=0;k<j;k++){
					if(board[i][k] == 0){
						if(noObstacle(i,k,i,j)){
							board[i][k] = board[i][j];
							board[i][j] = 0;
							showMoveAnimation(i,k,i,j);
							break;
						}
					}
					else if(board[i][k] == board[i][j]){
						if(noObstacle(i,k,i,j)){
							board[i][k] = board[i][j]*2;
							updateScore(board[i][j]);
							board[i][j] = 0;
							showMoveAnimation(i,k,i,j);
							break;
						}
					}
				}
			}
		}
	}
	return true;
}
function moveUp(){
	if(!canMoveUp())
		return false;
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j] != 0){
				for(var k=0;k<i;k++){
					if(board[k][j] == 0){
						if(noObstacle(k,j,i,j)){
							board[k][j] = board[i][j];
							board[i][j] = 0;
							showMoveAnimation(k,j,i,j);
							break;
						}
					}
					else if(board[k][j] == board[i][j]){
						if(noObstacle(k,j,i,j)){
							updateScore(board[i][j]);
							board[k][j] = board[i][j]*2;
							board[i][j] = 0;
							showMoveAnimation(k,j,i,j);
							break;
						}
					}
				}
			}
		}
	}
	return true;
}
function moveRight(){
	if(!canMoveRight())
		return false;
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j] != 0){
				for(var k=3;k>j;k--){
					if(board[i][k] == 0){
						if(noObstacle(i,k,i,j)){
							board[i][k] = board[i][j];
							board[i][j] = 0;
							showMoveAnimation(i,k,i,j);
							break;
						}
					}
					else if(board[i][k] == board[i][j]){
						if(noObstacle(i,k,i,j)){
							updateScore(board[i][j]);
							board[i][k] = board[i][j]*2;
							board[i][j] = 0;
							showMoveAnimation(i,k,i,j);
							break;
						}
					}
				}
			}
		}
	}
	return true;
}
function moveDown(){
	if(!canMoveDown())
		return false;
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j] != 0){
				for(var k=3;k>i;k--){
					if(board[k][j] == 0){
						if(noObstacle(k,j,i,j)){
							board[k][j] = board[i][j];
							board[i][j] = 0;
							showMoveAnimation(k,j,i,j);
							break;
						}
					}
					else if(board[k][j] == board[i][j]){
						if(noObstacle(k,j,i,j)){
							updateScore(board[i][j]);
							board[k][j] = board[i][j]*2;
							board[i][j] = 0;
							showMoveAnimation(k,j,i,j);
							break;
						}
					}
				}
			}
		}
	}
	return true;
}

function prepareMobile(){
	if(documentWidth>500){
		gridContainerWidth =500;
		$('header').css('width','500px');
		cellSpace = 20;
		cellSideLength = 100;
	}
	$('#grid-container').css({
		width:gridContainerWidth-2*cellSpace,
		height:gridContainerWidth-2*cellSpace,
		padding:cellSpace,
		borderRadius:0.02*cellSideLength
	});
	$('.grid-cell').css({
		width:cellSideLength,
		height:cellSideLength,
		borderRadius:0.02*cellSideLength
	});
	
}