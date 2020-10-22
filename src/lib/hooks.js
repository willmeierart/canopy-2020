import { useEffect, useState } from 'react'

export const useWindowSize = () => {
	const isClient = typeof window !== 'undefined';

	const getSize = () => {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		const handleResize = () => {
			setWindowSize(getSize());
		}

		handleResize()

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}
