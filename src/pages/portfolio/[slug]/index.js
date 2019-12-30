import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import PORTFOLIO_ITEM_QUERY from 'lib/queries/portfolioItem.query';
import { useWindowSize } from 'lib/hooks'
import { rfs } from 'lib/helpers'
import Player from 'components/Player'

const PortfolioItem = () => {
	const router = useRouter()
	const [isMobile, setIsMobile] = useState(false)
	const { width } = useWindowSize()

	const { data } = useQuery(PORTFOLIO_ITEM_QUERY({ slug: router.query.slug || '' }));

	useEffect(() => { setIsMobile(width < 500) }, [width < 500])

	useEffect(() => {
		!data?.portfolioModule?.url && router.push('/portfolio', '/portfolio', { shallow: true })
	}, [])

	const handleVidClick = videoRef => {
		videoRef.current.muted
			? isMobile && rfs(videoRef.current)
			: router.push('/portfolio', '/portfolio', { shallow: true })
	}

	return (
		<div className="container">
			{data?.portfolioModule?.url && <Player fullscreen={isMobile} src={data.portfolioModule.url} onClick={handleVidClick} />}
			<style jsx>{`
				.container {
					height: fit-content;
					transform: rotate(${isMobile ? 90 : 0}deg;
					width: fit-content;
				}
			`}</style>
		</div>
	)
}

export default PortfolioItem
