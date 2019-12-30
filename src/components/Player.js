import { useEffect, useRef, useState } from 'react'

const Player = ({ muted = true, onClick, src }) => {
	const videoRef = useRef(null)
	const [isMuted, setMuted] = useState(muted)
	const [vidHeight, setVidHeight] = useState(0)

	useEffect(() => {
		setVidHeight(videoRef.current?.getBoundingClientRect().height || 0)
	}, [videoRef.current, isMuted])

	const handleClick = () => {
		if (onClick) {
			setMuted(false)
			onClick(videoRef)
		} else {
			setMuted(!isMuted)
		}
	}

	return (
		<div className="container">
			{isMuted && (
				<div className="overlay" onClick={handleClick}>
					<img src="/static/images/mute.png" />
				</div>
			)}
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
				.container {
					position: relative;
				}

				.overlay {
					align-items: center;
					cursor: pointer;
					display: flex;
					height: ${vidHeight}px;
					justify-content: center;
					position: absolute;
					width: 100%;
					z-index: 1000;
				}

				video {
					position: absolute;
					width: 100vw;
					z-index: 500;
				}
			`}</style>
		</div>
	)
}

export default Player
