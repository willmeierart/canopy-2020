import { useEffect, useState } from 'react'
import { useWindowSize } from 'lib/hooks'
import PortfolioDesktop from 'components/Portfolio/PortfolioDesktop'
import PortfolioMobile from 'components/Portfolio/PortfolioMobile'

const Portfolio = ({ pageTransitionReadyToEnter }) => {
	const [activeType, setActiveType] = useState(null)
	const [isMobile, setIsMobile] = useState(false)
	const { width } = useWindowSize()

	useEffect(() => { setIsMobile(width < 500) }, [width < 500])

	return isMobile
		? <PortfolioMobile activeType={activeType} onLoaded={pageTransitionReadyToEnter} setActiveType={setActiveType} width={width - 20} />
		: <PortfolioDesktop activeType={activeType} onLoaded={pageTransitionReadyToEnter} setActiveType={setActiveType} />
}

Portfolio.pageTransitionDelayEnter = true

export default Portfolio
