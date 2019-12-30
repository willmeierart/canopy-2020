import { useQuery } from '@apollo/react-hooks'
import ABOUT_QUERY from 'lib/queries/about.query';
import { configureLayoutA } from 'lib/helpers'
import { routes } from 'lib/routes'
import Grid from 'components/Grid'

const AboutModule = ({ idx, layout, data }) => {
	const bgColor = () => {
		switch (true) {
			case idx < layout.columns:
				return 'var(--color-grey-dark)'
			case idx < layout.columns * 2:
				return 'var(--color-grey)'
			case idx < layout.columns * 3:
				return 'var(--color-grey-light)'
			default:
				return 'var(--color-grey-lighter)'
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
					color: ${background === 'var(color-grey-lighter)' ? 'var(color-grey-dark)' : '#fff'};
					cursor: ${data[idx]?.link ? 'pointer' : 'default'};
					height: ${layout.squareSize}px;
					line-height: .9rem;
					width: ${layout.squareSize}px;
					padding: .5rem;
				}
				.block:hover {
					filter: brightness(65%);
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
	const { data } = useQuery(ABOUT_QUERY);
	return (
		<div className="container">
			{data && <Grid BlockElement={AboutModule} configureLayout={configureLayoutA} data={data.aboutModules} />}
		</div>
	)
}

export default About
