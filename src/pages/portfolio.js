import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import PORTFILIO_QUERY from 'lib/queries/portfolio.query';
import { configureLayoutA } from 'lib/helpers'
import Grid from 'components/Grid'
import PaginationControls from 'components/PaginationControls'
import Player from 'components/Player'
import PortfolioModule from 'components/PortfolioModule'

const Portfolio = () => {
	const [playerOpen, setPlayerOpen] = useState(false)
	const [videoSrc, setVideoSrc] = useState('')

	const [itemCount, setItemCount] = useState(1)
	const [isPaginated, setIsPaginated] = useState(false)
	const [layoutInited, setLayoutInited] = useState(false)
	const [page, setPage] = useState(1)
	const [totalModulesPerPage, setTotalModulesPerPage] = useState(1)
	const [queryBatch, setQueryBatch] = useState('0-10')

	const { data, loading, error } = useQuery(PORTFILIO_QUERY({
		first: queryBatch.split('-')[1],
		skip: queryBatch.split('-')[0],
	}));

	const handleVidClick = videoRef => {
		!videoRef.current.muted && setPlayerOpen(false)
	}

	const handleBlockClick = url => {
		setPlayerOpen(true)
		setVideoSrc(url)
	}

	const handlePageChange = pageNumber => {
		const newQuerySkip = totalModulesPerPage * (pageNumber - 1)
		setPage(pageNumber)
		setQueryBatch(`${newQuerySkip}-${totalModulesPerPage * pageNumber}`)
	}

	const handleLayoutChangePagination = ({ total: totalSquares }) => {
		const shouldPaginate = totalSquares < itemCount
		setIsPaginated(shouldPaginate)

		if (queryBatch.split('-')[1] !== `${totalSquares * page}`) {
			setTotalModulesPerPage(totalSquares)
		}

		setLayoutInited(true)
	}

	useEffect(() => {
		setItemCount(data?.portfolioModulesConnection.aggregate.count || 0)
	}, [data?.portfolioModulesConnection.aggregate.count])

	useEffect(() => {
		const firstVidIdx = parseInt(queryBatch.split('-')[0]) + 1
		const newPageIdx = Math.ceil(firstVidIdx / totalModulesPerPage)
		layoutInited && handlePageChange(newPageIdx)
	}, [totalModulesPerPage])

	return (
		<div>
			{data && playerOpen
				? <Player src={videoSrc} onClick={handleVidClick} />
				: data && itemCount && (
					<div className="container">
						<Grid
							BlockElement={PortfolioModule}
							configureLayout={configureLayoutA}
							data={data.portfolioModules}
							layoutChangeCallback={handleLayoutChangePagination}
							onBlockClick={handleBlockClick}
						/>
						{isPaginated && (
							<PaginationControls
								onPageChange={handlePageChange}
								page={page}
								perPage={totalModulesPerPage}
								total={itemCount}
							/>
						)}
						<style jsx>{`
							.container {
								align-items: center;
								display: flex;
								flex-direction: column;
								justify-content: center;
							}
						`}</style>
					</div>
				)}
		</div>
	)
}

export default Portfolio
