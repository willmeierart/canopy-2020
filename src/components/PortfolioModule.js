import Router from 'next/router'
import { routes } from 'server/routes'

const PortfolioModule = ({ idx, layout, data, onClick }) => {
	const handleClick = (blockData) => {
		onClick && onClick(blockData)
		// Router.replace(routes.PORTFOLIO.path, `${routes.PORTFOLIO.path}/${blockData.slug || idx}`, { shallow: true })
	}

	const item = data[idx]

	return item ? (
		<div className="block" onClick={() => handleClick(data[idx]?.url)}>
			{item.text}
			<style jsx>{`
				.block {
					background: url('${item.thumbnail.url}');
					background-size: contain;
					box-sizing: border-box;
					color: rgba(255,255,255,0);
					cursor: ${item.link ? 'pointer' : 'default'};
					height: ${layout.squareSize}px;
					line-height: .9rem;
					width: ${layout.squareSize}px;
					overflow: hidden;
					padding: .5rem;
				}
				.block:hover {
					filter: brightness(75%);
					color: rgba(255,255,255,1);
					cursor: pointer;
					transition: filter .5s, color .5s;
				}
			`}</style>
		</div>
	) : null
}

export default PortfolioModule
