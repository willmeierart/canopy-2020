import ABOUT_QUERY from 'lib/queries/about.query';
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import Grid from 'components/Grid'

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

const AboutModule = ({ idx, layout, data }) => {
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

	const Default = () => (
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

	return idx === layout.total - 1
		? <Link href="/terms"><a>terms and conditions</a></Link>
		: !!(data[idx]?.link)
			? <a href={data[idx].link} target="_blank"><Default /></a>
			: <Default />
}

const About = () => {
	const { data, loading, error } = useQuery(ABOUT_QUERY);
	return (
		<div className="container">
			{data && <Grid data={data.aboutModules} configureLayout={configureLayout} BlockElement={AboutModule} />}
		</div>
	)
}

export default About
