import { useState } from 'react'
import { routes } from 'lib/routes'

const AboutModule = ({ idx, layout, data }) => {
	const [isHovered, setIsHovered] = useState(false)

	const bgColor = () => {
		switch (true) {
			case idx < layout.columns:
				return 'var(--color-grey-dark)'
			case idx < layout.columns * 2:
				return 'var(--color-grey)'
			case idx < layout.columns * 3:
				return 'var(--color-grey-light)'
			default:
				return 'var(--color-grey-lighter)'
		}
	}

	const hasImage = data[idx]?.image?.url
	const background = hasImage ? `url(${data[idx].image.url})` : bgColor()

	const Default = () => (
		<div className="block" onMouseEnter={() => { hasImage && setIsHovered(true) }} onMouseLeave={() => { hasImage && setIsHovered(false) }}>
			<span>{data[idx]?.text || ''}</span>
			{hasImage && <img className={isHovered ? 'hovered' : ''} src={data[idx].image.url} />}
			<style jsx>{`
				.block {
					background: ${bgColor()};
					box-sizing: border-box;
					color: ${background === 'var(color-grey-lighter)' ? 'var(color-grey-dark)' : '#fff'};
					cursor: ${data[idx]?.link ? 'pointer' : 'default'};
					height: ${layout.squareSize}px;
					line-height: .9rem;
					overflow: hidden;
					padding: .5rem;
					position: relative;
					white-space: pre-wrap;
					width: ${layout.squareSize}px;
				}

				span {
					z-index: 100;
				}

				img {
					height: 100%;
					left: 0;
					opacity: 0;
					position: absolute;
					top: 0;
					transition: opacity .5s;
					width: 100%;
					z-index: -1;
				}
				
				.hovered {
					opacity: 1;
					transition: opacity .5s;
				}

				.block:hover {
					filter: brightness(${hasImage ? '100%' : '65%'});
					transition: filter .5s;
				}
			`}</style>
		</div>
	)

	return idx === layout.total - 1
		? (
			<a target="_blank"href={routes.PRIVACY.path}>
				terms and conditions
				<style jsx>{`
					a {
						background: #dfdfdd;
						height: ${layout.squareSize}px;
						box-sizing: border-box;
						padding: .5rem;
					}
					a:hover {
						filter: brightness(90%);
						transition: filter .5s;
					}
				`}</style>
			</a>)
		: !!(data[idx]?.link)
			? <a href={data[idx].link} target="_blank"><Default /></a>
			: <Default />
}

export default AboutModule
