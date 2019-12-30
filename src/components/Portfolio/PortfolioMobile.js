import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import PORTFOLIO_QUERY from 'lib/queries/portfolio.query';
import { rfs } from 'lib/helpers'
import Player from 'components/Player'
import PortfolioModuleMobile from './PortfolioModuleMobile'

const PortfolioMobile = ({ onLoaded, width }) => {
	const [vidOpen, setVidOpen] = useState(false)
	const [vidSrc, setVidSrc] = useState(null)

	const { data, loading, error } = useQuery(PORTFOLIO_QUERY());

	const handleBlockClick = item => {
		setVidOpen(true)
		setVidSrc(item.url)
	}

	const handleVidClick = videoRef => {
		videoRef.current.muted
			? rfs(videoRef.current)
			: setVidOpen(false)
	}

	useEffect(() => { data && onLoaded() }, [])

	return (
		<div>
			{data && (
				<>
					{vidOpen && (
						<Player
							horizontal
							onClick={handleVidClick}
							src={vidSrc}
						/>
					)}
					<div className="container">
						{data.portfolioModules.map((item, i) => (
							<PortfolioModuleMobile item={item} key={`module-${i}`} onClick={handleBlockClick} width={width} />
						))}
						<style jsx>{`
							.container {
								align-items: center;
								display: ${vidOpen ? 'none' : 'flex'};
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
