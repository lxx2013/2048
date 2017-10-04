function isMoving() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (moving[i][j] != 0) {
				return true;
			}
		}
	}
	return false;
}

function showNumberWithAnimation(i, j, num, flag) {
	var cell = $('<div class="number-cell-' + i + '-' + j + ' color' + num + '">' + num + '</div>');
	cell.addClass('number-cell ');
	cell.css({
		fontSize: num >= 1024 ? cellSideLength * 0.4 : cellSideLength * 0.6,
		lineHeight: cellSideLength + 'px'
	});
	setTimeout(function () {
		$('#grid-container').append(cell)
	}, 198)
}

function showMoveAnimation(toi, toj, fromi, fromj) {
	var oldClass = 'number-cell-' + fromi + '-' + fromj;
	var newClass = 'number-cell-' + toi + '-' + toj;
	var num = board[toi][toj];
	$('.' + newClass).remove();
	var text = $('.' + oldClass).text();
	var old = $('.' + oldClass);
	old.removeClass(oldClass);
	old.addClass(newClass);
	if (text != num) {
		setTimeout(function () {
			old.remove();
			var merge = $('<div class="number-cell ' + newClass + ' color' + num + '">' + num + '</div>');
			merge.css({
				fontSize: num >= 1024 ? cellSideLength * 0.4 : cellSideLength * 0.6,
				lineHeight: cellSideLength + 'px'
			});
			$('#grid-container').append(merge);
		}, 198)
	}

}
