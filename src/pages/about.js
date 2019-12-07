import { useEffect, useState } from 'react'
import ABOUT_QUERY from 'lib/queries/about.query';
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

const calcColumns = width => {
	switch (true) {
		case width > 1000:
			return 9
		case width > 500:
			return Math.floor((width - 100) / 100)
		default:
			return 1
	}
}

const configureLayout = (width, height) => {
	const columns = calcColumns(width)
	const gutterTotal = (columns + 1) * 10
	const squareSize = Math.floor((width - gutterTotal) / columns)
	const heightMinusHeader = height - 100 - gutterTotal
	const rows = (heightMinusHeader - (heightMinusHeader % squareSize)) / squareSize
	const total = columns * rows
	return { columns, squareSize, total }
}

const renderGrid = (layout, data) => Array.from('a'.repeat(layout.total)).reduce((formatted, block, idx) => {
	const bgColor = () => {
		switch (true) {
			case idx < layout.columns:
				return '#696964'
			case idx < layout.columns * 2:
				return '#a5a5a2'
			case idx < layout.columns * 3:
				return '#c9c9c7'
			default:
				return '#dfdfdd'
		}
	}

	const background = bgColor()

	const Block = () => (
		<div className="block">
			{data[idx]?.text || ''}
			<style jsx>{`
				.block {
					background: ${background};
					box-sizing: border-box;
					color: ${background === '#dfdfdd' ? '#696964' : '#fff'};
					cursor: ${data[idx]?.link ? 'pointer' : 'default'};
					height: ${layout.squareSize}px;
					max-width: ${layout.squareSize}px;
					padding: 1rem;
				}
			`}</style>
		</div>
	)

	const element = idx === layout.total - 1
		? <Link href="/terms"><a>terms and conditions</a></Link>
		: !!(data[idx]?.link)
			? <a href={data[idx].link} target="_blank"><Block /></a>
			: <Block />

	formatted.push(<div key={`block-${idx}`}>{element}</div>)
	return formatted

}, [])

const About = () => {
	const { data, loading, error } = useQuery(ABOUT_QUERY);

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
			{data?.aboutModules && renderGrid(layout, data?.aboutModules)}
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

export default About
