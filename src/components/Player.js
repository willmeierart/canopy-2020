import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'lib/hooks'

const Player = ({
	onVideoEnd,
	homepage,
	muted = false,
	onClick,
	src,
}) => {
	const videoRef = useRef(null)
	const [inited, setInited] = useState(false)
	const [isMuted, setIsMuted] = useState(muted)
	const [isPaused, setIsPaused] = useState(false)
	const [vidHeight, setVidHeight] = useState(0)
	const { width, height } = useWindowSize()

	useEffect(() => {
		setVidHeight(videoRef.current?.getBoundingClientRect().height || 0)
	}, [videoRef.current, videoRef.current?.networkState, height, width, isMuted, inited, src])

	useEffect(() => {
		videoRef.current.onplay = () => setIsPaused(false)
		const isMobile = typeof window.orientation !== 'undefined'
		isMobile && setIsPaused(videoRef.current?.paused)
	}, [videoRef.current?.paused, videoRef.current?.muted])

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.onended = onVideoEnd ? () => { onVideoEnd(); setInited(false) } : () => {}
			videoRef.current.oncanplay = setTimeout(() => { setInited(true) }, 400) // hack to fix getBoundingClientRect returning wrong height
		}

	}, [videoRef.current])

	const handleClick = () => {
		if (onClick) {
			setIsMuted(false)
			onClick(videoRef)
		} else {
			setIsMuted(!isMuted)
		}

		const isMobile = typeof window.orientation !== 'undefined'
		isMobile && videoRef.current?.play()
	}

	const maxImgSize = Math.min(width, height) / 20

	return (
		<div className="container" onClick={handleClick}>
			{(isMuted || isPaused) && (
				<div className="overlay" onClick={handleClick}>
					<img alt="mute-btn" src={isPaused ? '/static/images/play.png' : '/static/images/mute.png'} />
				</div>
			)}
			<video
				autoPlay
				controls={!homepage}
				key={src}
				loop={!onVideoEnd}
				muted={isMuted}
				onClick={handleClick}
				preload="auto"
				ref={videoRef}
				src={src}
			/>
			<style jsx>{`
				.container {
					height: ${vidHeight}px;
					position: relative;
				}

				.overlay {
					align-items: center;
					cursor: pointer;
					display: flex;
					height: ${vidHeight}px;
					justify-content: center;
					max-height: ${vidHeight}px;
					position: absolute;
					width: 100vw;
					z-index: 1000;
				}

				img {
					max-width: ${maxImgSize}px;
				}

				video {
					max-height: calc(100vh - 120px);
					position: absolute;
					width: 100vw;
					z-index: 500;
				}
			`}</style>
		</div>
	)
}

export default Player
