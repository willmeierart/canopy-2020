import { useEffect, useState } from 'react'
import { useWindowSize } from 'lib/hooks'

import PortfolioDesktop from 'components/Portfolio/PortfolioDesktop'
import PortfolioMobile from 'components/Portfolio/PortfolioMobile'

const Portfolio = () => {
	const [isMobile, setIsMobile] = useState(false)
	const { width } = useWindowSize()

	useEffect(() => { setIsMobile(width < 500) }, [width < 500])

	return isMobile ?
		(
			<PortfolioMobile width={width - 20} />
		) : (
			<PortfolioDesktop />
		)
}

export default Portfolio
