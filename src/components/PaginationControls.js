const PaginationControls = ({ onPageChange, page, perPage, total }) => {
	const totalMarkers = Math.ceil(total / perPage)
	return (
		<div className="container">
			{Array.from('a'.repeat(totalMarkers)).map((a, i) => {
				const pageNumber = i + 1
				const isActive = page === pageNumber
				return (
					<div
						className={`marker ${isActive && 'active'}`}
						key={`marker-${i}`}
						onClick={() => { !isActive && onPageChange(pageNumber)}}
					/>
				)
			})}
			<style jsx>{`
				.container {
					align-items: center;
					display: flex;
					justify-content: center;
				}
				.marker {
					background: var(--color-grey-light);
					cursor: pointer;
					height: 10px;
					margin: 2px;
					transition: background .5s;
					width: 10px;
				}
				.marker:hover {
					background: var(--color-grey);
				}
				.active {
					border: 1px solid black;
					cursor: default;
					background: var(--color-grey);
				}
			`}</style>
		</div>
	)
}

export default PaginationControls
