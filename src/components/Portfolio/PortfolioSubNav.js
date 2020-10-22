const PortfolioSubNav = ({ activeType, setActiveType }) => {

	const handleClick = type => setActiveType(type === activeType ? null : type)

	return (
		<div>
			{['creative', 'commercial'].map(type => (
				<span className={activeType === type ? 'active' : ''} key={type} onClick={() => handleClick(type)}>
					{type}
				</span>
			))}
			<style jsx>{`
				div {
					margin-top: -1.5rem;
					margin-bottom: .5rem;
				}
				span {
					cursor: pointer;
					margin-left: 1rem;
					padding: 1px;
				}
				span:hover {
					background-color: var(--color-background-hover);
					color: var(--color-text-hover);
					transition: background-color .5s, color .5s;
				}
				span.active {
					background-color: var(--color-background-hover);
					color: var(--color-text-hover);
				}
				span.active:hover {
					background-color: var(--color-background-hover-active);
				}

				@media screen and (max-width: 540px) {
					div {
						margin-left: auto;
						margin-right: .5rem;
						margin-top: 0;
					}
				}
			`}</style>
		</div>

	)
}

export default PortfolioSubNav
