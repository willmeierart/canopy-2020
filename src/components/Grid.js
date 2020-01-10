import { useEffect, useState } from 'react'

const renderGrid = (layout, data, BlockElement, onBlockClick) =>
	Array.from('a'.repeat(layout.total))
		.map((block, idx) => <BlockElement key={`block-${idx}`} idx={idx} layout={layout} data={data} onClick={onBlockClick} />)

const Grid = ({ BlockElement, configureLayout, data, layoutChangeCallback, onBlockClick = () => {} }) => {
	const [windowWidth, setWindowWidth] = useState(0)
	const [windowHeight, setWindowHeight] = useState(0)
	const [layout, setLayout] = useState({ total: 0, width: 0, height: 0 })

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window?.innerWidth)
			setWindowHeight(window?.innerHeight)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})

	useEffect(() => {
		const newLayout = configureLayout(windowWidth, windowHeight, layoutChangeCallback, data.length + 1) // needs debouncing
		setLayout(newLayout)
	}, [windowWidth, windowHeight])

	return (
		<div className="container">
			{renderGrid(layout, data, BlockElement, onBlockClick)}
			<style jsx>{`
				.container {
					box-sizing: border-box;
					display: grid;
					grid-row-gap: 10px;
					grid-column-gap: 10px;
					grid-template-columns: repeat(${layout.columns}, 1fr);
					padding: 10px;
					padding-top: 0;
					width: 100vw;
				}
			`}</style>
		</div>
	)
}

export default Grid
