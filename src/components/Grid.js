import { useEffect, useState } from 'react'

const renderGrid = (layout, data, BlockElement) =>
	Array.from('a'.repeat(layout.total))
		.map((block, idx) => <BlockElement key={`block-${idx}`} idx={idx} layout={layout} data={data} />)

const Grid = ({ data, configureLayout, BlockElement }) => {
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
		const newLayout = configureLayout(windowWidth, windowHeight) // needs debouncing
		setLayout(newLayout)
	}, [windowWidth, windowHeight])

	return (
		<div className="container">
			{renderGrid(layout, data, BlockElement)}
			<style jsx>{`
				.container {
					box-sizing: border-box;
					display: grid;
					grid-row-gap: 1rem;
					grid-column-gap: 1rem;
					grid-template-columns: repeat(${layout.columns}, 1fr);
					padding: 0 1rem 1rem 1rem;
					width: 100vw;
				}
			`}</style>
		</div>
	)
}

export default Grid
