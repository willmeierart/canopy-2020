import { useQuery } from '@apollo/react-hooks'
import ABOUT_QUERY from 'lib/queries/about.query';
import { configureLayoutA } from 'lib/helpers'
import { routes } from 'server/routes'
import Grid from 'components/Grid'

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
					line-height: .9rem;
					width: ${layout.squareSize}px;
					padding: .5rem;
				}
				.block:hover {
					filter: brightness(90%);
					transition: filter .5s;
				}
			`}</style>
		</div>
	)

	return idx === layout.total - 1
		? (
			<a target="_blank"href={routes.PRIVACY.path}>
				terms and conditions
				<style jsx>{`
					a {
						background: #dfdfdd;
						box-sizing: border-box;
						padding: .5rem;
					}
					a:hover {
						filter: brightness(90%);
						transition: filter .5s;
					}
				`}</style>
			</a>)
		: !!(data[idx]?.link)
			? <a href={data[idx].link} target="_blank"><Default /></a>
			: <Default />
}

const About = () => {
	const { data, loading, error } = useQuery(ABOUT_QUERY);
	return (
		<div className="container">
			{data && <Grid BlockElement={AboutModule} configureLayout={configureLayoutA} data={data.aboutModules} />}
		</div>
	)
}

export default About
