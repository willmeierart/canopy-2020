import { useEffect, useRef, useState } from 'react'

const Player = ({ src, muted = true, onClick }) => {
	const videoRef = useRef(null)
	const [isMuted, setMuted] = useState(muted)
	// useEffect(() => {
	// 	console.log(videoRef.current?.onplay)
	// }, [src, onClick, videoRef.current])

	const handleClick = () => {
		if (onClick) return onClick()
		setMuted(!isMuted)
	}

	return (
		<div>
			<video
				autoPlay
				loop
				muted={isMuted}
				onClick={handleClick}
				preload="auto"
				ref={videoRef}
				src={src}
			/>
			<style jsx>{`
				video {
					cursor: ${muted ? 'pointer' : 'default'};
					width: 100vw;
				}
			`}</style>
		</div>
	)
}

export default Player
