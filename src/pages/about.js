import { useQuery } from '@apollo/react-hooks'
import ABOUT_QUERY from 'lib/queries/about.query';
import { configureLayout } from 'lib/helpers'
import AboutModule from 'components/About/AboutModule'
import Grid from 'components/Grid'
import PageHead from 'layout/PageHead'

const About = () => {
	const { data } = useQuery(ABOUT_QUERY);
	return (
		<div className="container">
			<PageHead metadata={data?.pageMetadata} />
			{data && <Grid BlockElement={AboutModule} configureLayout={configureLayout} data={data.aboutModules} />}
		</div>
	)
}

export default About
