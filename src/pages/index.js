import { useQuery } from '@apollo/react-hooks'
import HOME_QUERY from 'lib/queries/home.query';
import Player from 'components/Player'

const Home = () => {
	const { data } = useQuery(HOME_QUERY);
	const videoSrc = data?.homepageSliders[0].url

	return (
		<div>
			<Player src={videoSrc} />
		</div>
	)
}

export default Home
