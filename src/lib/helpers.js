const calcColumnsA = width => {
	switch (true) {
		case width > 1000:
			return 9
		case width > 800:
			return 5
		case width > 600:
			return 3
		case width > 500:
			return Math.floor((width - 100) / 100)
		default:
			return 1
	}
}

export const configureLayoutA = (width, height, callback) => {
	const columns = calcColumnsA(width)
	const gutterTotal = (columns + 1) * 10
	const squareSize = Math.floor((width - gutterTotal) / columns)
	const heightMinusHeader = height - 100 - gutterTotal
	const rows = (heightMinusHeader - (heightMinusHeader % squareSize)) / squareSize
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
