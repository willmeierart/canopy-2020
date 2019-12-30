import { useEffect, useState } from 'react'
import { useWindowSize } from 'lib/hooks'

import PortfolioDesktop from 'components/Portfolio/PortfolioDesktop'
import PortfolioMobile from 'components/Portfolio/PortfolioMobile'

const Portfolio = ({ pageTransitionReadyToEnter }) => {
	const [isMobile, setIsMobile] = useState(false)
	const { width } = useWindowSize()

	useEffect(() => { setIsMobile(width < 500) }, [width < 500])

	return isMobile
		? <PortfolioMobile onLoaded={pageTransitionReadyToEnter} width={width - 20} />
		: <PortfolioDesktop onLoaded={pageTransitionReadyToEnter} />
}

Portfolio.pageTransitionDelayEnter = true

export default Portfolio
