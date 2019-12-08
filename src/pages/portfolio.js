import Router from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import PORTFILIO_QUERY from 'lib/queries/portfolio.query';
import { routes } from 'server/routes'
import Grid from 'components/Grid'

const configureLayout = (width, height) => {
	const columns = 9
	const gutterTotal = (columns + 1) * 10
	const squareSize = Math.floor((width - gutterTotal) / columns)
	return { columns, squareSize, total: 36 }
}

const PortfolioModule = ({ idx, layout, data }) => {
	const handleClick = () => {
		Router.push(routes.PORTFOLIO.path, `${routes.PORTFOLIO.path}/${idx}`, { shallow: true })
	}

	return (
		<div className="block" onClick={handleClick}>
			{data[idx]?.text || 'some text about this piece'}
			<style jsx>{`
				.block {
					background: #a5a5a2;
					box-sizing: border-box;
					color: rgba(255,255,255,0);
					cursor: ${data[idx]?.link ? 'pointer' : 'default'};
					height: ${layout.squareSize}px;
					max-width: ${layout.squareSize}px;
					padding: 1rem;
				}
				.block:hover {
					filter: brightness(75%);
					color: rgba(255,255,255,1);
					cursor: pointer;
					transition: filter .5s, color .5s;
				}
			`}</style>
		</div>
	)
}

const Portfolio = (props) => {
	const { data, loading, error } = useQuery(PORTFILIO_QUERY());
	return (
		<div>
			{data && <Grid BlockElement={PortfolioModule} configureLayout={configureLayout} data={data.portfolioModules} />}
		</div>
	)
}

export default Portfolio
