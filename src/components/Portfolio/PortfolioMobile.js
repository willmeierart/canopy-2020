import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import PORTFOLIO_QUERY from 'lib/queries/portfolio.query';
import PortfolioModuleMobile from './PortfolioModuleMobile'
import PageHead from 'layout/PageHead'

const PortfolioMobile = ({ onLoaded, width }) => {
	const router = useRouter()

	const { data } = useQuery(PORTFOLIO_QUERY());

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
