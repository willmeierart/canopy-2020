import { useEffect, useState } from 'react'

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
					background: lightgrey;
					cursor: pointer;
					height: 10px;
					margin: 2px;
					width: 10px;
				}
				.active {
					border: 1px solid black;
					cursor: default;
				}
			`}</style>
		</div>
	)
}

export default PaginationControls
