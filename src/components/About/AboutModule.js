import { routes } from 'lib/routes'

const AboutModule = ({ idx, layout, data }) => {
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
	const txtColor = background === 'var(color-grey-lighter)' ? 'var(color-grey-dark)' : '#fff'

	const Default = () => (
		<div className="block">
			{data[idx]?.text || ''}
			{hasImage && <div className="img" />}
			<style jsx>{`
				.block {
					background: ${background};
					background-repeat: no-repeat;
					background-size: cover;
					box-sizing: border-box;
					color: ${hasImage ? 'rgba(255, 255, 255, 0)' : txtColor};
					cursor: ${data[idx]?.link ? 'pointer' : 'default'};
					height: ${layout.squareSize}px;
					line-height: .9rem;
					overflow: hidden;
					padding: .5rem;
					white-space: pre-wrap;
					width: ${layout.squareSize}px;
				}

				.block:hover {
					color: ${txtColor};
					filter: brightness(${hasImage ? '100%' : '65%'});
					transition: filter .5s, color .5s;
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
