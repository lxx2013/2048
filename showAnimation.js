var isAnimating = new Array();
for(var i = 0;i<16;i++){
	isAnimating[i] = 0;
}
const moveTimer = 200;
function isMoving(){
	for(var x=0;x<4;x++){
		for(var y=0;y<4;y++){
			if(isAnimating[x*4+y] == 1)
				return true;
		}
	}
	return false;
}
function showNumberWithAnimation(i,j,num){
	if(isMoving()){
		setTimeout(function(){
			showNumberWithAnimation(i,j,num)
		},moveTimer);
		return;
	}
	//isAnimating[i*4+j] = 1;
	var cell = $('#number-cell-'+i+'-'+j);
	cell.css({
		color:getNumColor(num),
		backgroundColor:getNumberBackgroundColor(num),
		width:cellSideLength,
		height:cellSideLength,
		lineHeight:cellSideLength+'px',
		fontSize:cellSideLength*0.6,
		opacity:0
	})
	board[i][j] = num;
	cell.text(board[i][j]);
	cell.animate({
		opacity:1
	},moveTimer,function(){
		//isAnimating[i*4+j] = 0;
	});
}

function showMoveAnimation(toi,toj,fromi,fromj){
	if(isAnimating[fromi*4+fromj] == 1){
		setTimeout(function(){
			showMoveAnimation(toi,toj,fromi,fromj);
		},moveTimer);
		return;
	}
	isAnimating[fromi*4+fromj] = 1;
	var cell = $('#number-cell-'+fromi+'-'+fromj);
	cell.animate({
		top:getposTop(toi,toj),
		left:getposLeft(toi,toj)
	},moveTimer,function(){
		isAnimating[fromi*4+fromj] = 0;
		updateBoardView();
	});
}