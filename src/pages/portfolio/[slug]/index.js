import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import PORTFOLIO_ITEM_QUERY from 'lib/queries/portfolioItem.query';
import { useWindowSize } from 'lib/hooks'
import Player from 'components/Player'
import PageHead from 'layout/PageHead'

const PortfolioItem = () => {
	const router = useRouter()
	const [isMobile, setIsMobile] = useState(false)
	const { width } = useWindowSize()

	const { data, error } = useQuery(PORTFOLIO_ITEM_QUERY({ slug: router.query.slug || '' }));

	useEffect(() => {
		(!data?.portfolioModule?.url || error) && router.push('/portfolio', '/portfolio', { shallow: true })
	}, [])

	useEffect(() => { setIsMobile(width < 500) }, [width < 500])

	const handleVidClick = () => router.push('/portfolio', '/portfolio', { shallow: true })

	return error ? null : (
		<div className="container">
			<PageHead metadata={data?.portfolioModule} />
			{data?.portfolioModule?.url && <Player fullscreen={isMobile} src={data.portfolioModule.url} onClick={handleVidClick} />}
			<style jsx>{`
				.container {
					height: fit-content;
					width: fit-content;
				}
			`}</style>
		</div>
	)
}

export default PortfolioItem
