const PortfolioModuleDesktop = ({ idx, layout, data, onClick }) => {
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
					transition: color .5s;
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

export default PortfolioModuleDesktop
