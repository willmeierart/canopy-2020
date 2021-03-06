import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import PORTFOLIO_QUERY from 'lib/queries/portfolio.query';
import { configureLayout } from 'lib/helpers'
import Grid from 'components/Grid'
import PaginationControls from 'components/PaginationControls'
import PortfolioModuleDesktop from './PortfolioModuleDesktop'
import PortfolioSubNav from './PortfolioSubNav'
import PageHead from 'layout/PageHead'

const PortfolioDesktop = ({ activeType, onLoaded, setActiveType }) => {
	const router = useRouter()

	const [itemCount, setItemCount] = useState(1)
	const [isPaginated, setIsPaginated] = useState(false)
	const [layoutInited, setLayoutInited] = useState(false)
	const [page, setPage] = useState(1)
	const [totalModulesPerPage, setTotalModulesPerPage] = useState(1)
	const [queryBatch, setQueryBatch] = useState([0, 10])

	const { data } = useQuery(PORTFOLIO_QUERY({ first: queryBatch[1], skip: queryBatch[0], type: activeType }));

	const handleBlockClick = blockData => {
		router.push(`/portfolio/${blockData?.slug}`, `/portfolio/${blockData?.slug}`, { shallow: true })
	}

	const handlePageChange = pageNumber => {
		const newQuerySkip = totalModulesPerPage * (pageNumber - 1)
		setPage(pageNumber)
		setQueryBatch([newQuerySkip, totalModulesPerPage * pageNumber])
		router.push('/portfolio', `/portfolio?page=${pageNumber}&per_page=${totalModulesPerPage}`, { shallow: true })
	}

	const handleLayoutChangePagination = ({ total: totalSquares }) => {
		const shouldPaginate = totalSquares < itemCount
		setIsPaginated(shouldPaginate)

		if (queryBatch[1] !== totalSquares * page) {
			setTotalModulesPerPage(totalSquares)
		}

		setLayoutInited(true)
	}

	useEffect(() => { data && onLoaded() }, [])

	useEffect(() => {
		setItemCount(data?.portfolioModulesConnection.aggregate.count || 0)
	}, [data?.portfolioModulesConnection.aggregate.count])

	useEffect(() => {
		const firstVidIdx = queryBatch[0] + 1
		const newPageIdx = Math.ceil(firstVidIdx / totalModulesPerPage)
		layoutInited && handlePageChange(newPageIdx)
	}, [totalModulesPerPage])

	return (
		<div>
			{data && itemCount && (
				<div className="container">
					<PageHead metadata={data.pageMetadata} />
					<PortfolioSubNav activeType={activeType} setActiveType={setActiveType} />
					<Grid
						BlockElement={PortfolioModuleDesktop}
						configureLayout={configureLayout}
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

export default PortfolioDesktop
