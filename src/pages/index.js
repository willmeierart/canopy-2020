import { useQuery } from '@apollo/react-hooks'
import HOME_QUERY from 'lib/queries/home.query';
import Slideshow from 'components/Slideshow'
import PageHead from 'layout/PageHead'

const Home = () => {
	const { data } = useQuery(HOME_QUERY);
	return (
		<div>
			<PageHead metadata={data?.pageMetadata} />
			<Slideshow
				homepage={true}
				muted={true}
				srcList={data?.homepageSliders || [{}]}
			/>
		</div>
	)
}

export default Home
