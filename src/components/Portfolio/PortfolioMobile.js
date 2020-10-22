import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import PORTFOLIO_QUERY from 'lib/queries/portfolio.query';
import PortfolioModuleMobile from './PortfolioModuleMobile'
import PortfolioSubNav from './PortfolioSubNav'
import PageHead from 'layout/PageHead'

const PortfolioMobile = ({ activeType, onLoaded, setActiveType, width }) => {
	const router = useRouter()

	const { data } = useQuery(PORTFOLIO_QUERY({ type: activeType }));

	const handleBlockClick = item => {
		router.push(`/portfolio/${item.slug}`, `/portfolio/${item.slug}`, { shallow: true })
	}

	useEffect(() => { data && onLoaded() }, [])

	return (
		<div>
			{data && (
				<>
					<PageHead metadata={data.pageMetadata} />
					<div className="container">
						<PortfolioSubNav activeType={activeType} setActiveType={setActiveType} />
						{data.portfolioModules.map((item, i) => (
							<PortfolioModuleMobile item={item} key={`module-${i}`} onClick={handleBlockClick} width={width} />
						))}
						<style jsx>{`
							.container {
								align-items: center;
								display: flex;
								flex-direction: column;
								justify-content: center;
							}
						`}</style>
					</div>
				</>
			)}
		</div>
	)
}

export default PortfolioMobile
