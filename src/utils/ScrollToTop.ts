import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 1000);
	}, [pathname]); // run whenever route changes

	return null;
}
