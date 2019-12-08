import { useRef, useState } from 'react'

const Player = ({ src, muted = true }) => {
	const videoElement = useRef(null)
	const [isMuted, setMuted] = useState(muted)

	return (
		<div>
			<video
				autoPlay
				loop
				muted={muted}
				onClick={() => setMuted(!isMuted)}
				preload="auto"
				ref={videoElement}
				src={src}
			/>
			<style jsx>{`
				video { width: 100vw; }
			`}</style>
		</div>
	)
}

export default Player
