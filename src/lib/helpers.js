const calcColumns = width => {
	switch (true) {
		case width > 1100:
			return 9
		case width > 800:
			return 7
		case width > 600:
			return 5
		case width > 400:
			return Math.floor((width - 100) / 100)
		default:
			return 1
	}
}

export const configureLayout = (width, height, callback, numItems) => {
	const columns = calcColumns(width)
	const gutterTotal = (columns + 1) * 10
	const squareSize = Math.floor((width - gutterTotal) / columns)
	const heightMinusHeader = height - 50 - gutterTotal
	const rows = columns > 1 ? (heightMinusHeader - (heightMinusHeader % squareSize)) / squareSize : numItems || 7
	const total = columns * rows
	const layoutVals = { columns, squareSize, total }
	callback && callback(layoutVals)
	return layoutVals
}

export const configureLayoutB = (width, height, callback) => {
	const columns = 9
	const gutterTotal = (columns + 1) * 10
	const squareSize = Math.floor((width - gutterTotal) / columns)
	const layoutVals = { columns, squareSize, total: 36 }
	callback && callback(layoutVals)
	return layoutVals
}

export 	const rfs = el => {
	if (el.requestFullscreen) {
		el.requestFullscreen()
	} else if (el.mozRequestFullScreen) {
		el.mozRequestFullScreen()
	} else if (el.webkitRequestFullscreen) {
		el.webkitRequestFullscreen()
	} else if (el.msRequestFullscreen) {
		el.msRequestFullscreen()
	}
}
