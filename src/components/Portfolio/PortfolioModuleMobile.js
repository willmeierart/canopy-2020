import { useState } from 'react'

const PortfolioModuleMobile = ({ item, onClick, width }) => {
	const [isActive, setIsActive] = useState(false)

	const handleOpenVid = () => setIsActive(false)

	const handleClick = () => {
		if (!isActive) {
			setIsActive(true)
			setTimeout(handleOpenVid, 3000)
			return
		}

		handleOpenVid()
		onClick(item)
	}

	return item ? (
		<div className={`block ${isActive && 'block-hovered'}`} onClick={handleClick}>
			<div className="text">{item.text}</div>
			<div className={`overlay ${isActive && 'overlay-hovered'}`} />
			<style jsx>{`
				.block {
					box-sizing: border-box;
					color: rgba(255,255,255,0);
					cursor: pointer;
					height: ${width}px;
					margin-bottom: 10px;
					overflow: hidden;
					position: relative;
					transform: rotate(90deg);
					transition: color .5s;
					white-space: pre-wrap;
					width: ${width}px;
				}
				.block-hovered {
					color: rgba(255,255,255,1);
					transition: color .5s;
				}
				.text {
					box-sizing: border-box;
					color: inherit;
					cursor: pointer;
					height: inherit;
					line-height: .9rem;
					padding: .5rem;
					pointer-events: none;
					position: absolute;
					width: inherit;
					z-index: 5;
				}
				.overlay {
					background: url('${item.thumbnail.url}');
					background-repeat: no-repeat;
					background-size: cover;
					box-sizing: border-box;
					cursor: pointer;
					height: inherit;
					position: absolute;
					transition: filter .5s;
					width: inherit;
				}
				.overlay-hovered {
					filter: brightness(65%);
					transition: color .5s;
				}
				
			`}</style>
		</div>
	) : null
}

export default PortfolioModuleMobile
