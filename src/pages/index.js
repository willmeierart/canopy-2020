import { useRef, useState } from 'react'
import HOME_QUERY from 'lib/queries/home.query';
import { useQuery } from '@apollo/react-hooks'

const Home = () => {
	const videoElement = useRef(null)
	const [muted, setMuted] = useState(true)
	const { data, loading, error } = useQuery(HOME_QUERY);
	const videoSrc = data?.homepageSliders[0].url

	return (
		<div>
			<video ref={videoElement} onClick={() => setMuted(!muted)} src={videoSrc} preload="auto" autoPlay muted={muted} loop />
			<style jsx>{`
				video {
					width: 100vw;
				}
			`}</style>
		</div>
	)
}

export default Home
