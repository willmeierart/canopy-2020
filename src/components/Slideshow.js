import { useEffect, useState } from 'react'
import PaginationControls from 'components/PaginationControls'
import Player from 'components/Player'

const Slideshow = ({
	srcList,
	type = 'video',
	...extra
}) => {
	const [activeIdx, setActiveIdx] = useState(0)
	const [transitionState, setTransitionState] = useState(0)

	const handleSlideChange = (newPg = activeIdx + 2) => {
		const newPgIdx = newPg - 1
		let newTransitionState = newPgIdx < activeIdx ? 1 : -1
		if (newPgIdx < srcList.length) {
			setTransitionState(newTransitionState)
			setActiveIdx(newPgIdx)
		} else {
			setActiveIdx(0)
		}
	}

	const SlideComponent = props => {
		switch (type) {
			case 'video':
			default:
				return <Player onVideoEnd={handleSlideChange} {...props} />
		}
	}

	useEffect(() => { transitionState && setTransitionState(0) }, [transitionState])

	return (
		<div className="container">
			<SlideComponent
				className="vid"
				src={srcList[activeIdx].url}
				{...extra}
			/>
			{/* {!!transitionState && <SlideComponent className="animated" src={srcList[activeIdx + transitionState].url} {...extra} />} */}
			{srcList.length > 1 && (
				<PaginationControls
					keyMod="slider"
					onPageChange={handleSlideChange}
					page={activeIdx + 1}
					total={srcList.length}
				/>
			)}
			<style jsx>{`
				.container {
					height: calc(100% + 20px);
				}
				.animated {
					transition: translate-x 1s;
					translate-x: ${transitionState * 100}%; 
				}
			`}</style>
		</div>
	)
}

export default Slideshow
