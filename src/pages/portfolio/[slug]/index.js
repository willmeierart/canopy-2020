import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import PORTFOLIO_ITEM_QUERY from 'lib/queries/portfolioItem.query';
import Player from 'components/Player'

const PortfolioItem = () => {
	const router = useRouter()
	const { data } = useQuery(PORTFOLIO_ITEM_QUERY({ slug: router.query.slug || '' }));

	useEffect(() => {
		!data?.portfolioModule?.url && router.push('/portfolio', '/portfolio', { shallow: true })
	}, [])

	const handleVidClick = videoRef => {
		!videoRef.current.muted && router.push('/portfolio', '/portfolio', { shallow: true })
	}

	return (
		<div>
			{data?.portfolioModule?.url && <Player src={data.portfolioModule.url} onClick={handleVidClick} />}
		</div>
	)
}

export default PortfolioItem
