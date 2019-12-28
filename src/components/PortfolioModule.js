import Router from 'next/router'
import { routes } from 'lib/routes'

const PortfolioModule = ({ idx, layout, data, onClick }) => {
	const handleClick = (blockData) => {
		onClick && onClick(blockData)
	}

	const item = data[idx]

	return item ? (
		<div className="block" onClick={() => handleClick(data[idx])}>
			<div className="text">{item.text}</div>
			<div className="overlay" />
			<style jsx>{`
				.block {
					background-size: contain;
					box-sizing: border-box;
					color: rgba(255,255,255,0);
					cursor: pointer;
					height: ${layout.squareSize}px;
					overflow: hidden;
					position: relative;
					transition: color .5s;
					white-space: pre-wrap;
					width: ${layout.squareSize}px;
				}
				.block:hover {
					color: rgba(255,255,255,1);
				}
				.text {
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
					cursor: pointer;
					height: inherit;
					position: absolute;
					width: inherit;
				}
				.overlay:hover {
					filter: brightness(65%);
					transition: filter .5s;
				}
				
			`}</style>
		</div>
	) : null
}

PortfolioModule.getInititalProps = ({ query }) => {
	console.log(query)
	
}

export default PortfolioModule
