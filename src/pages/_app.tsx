import AppLayout from '@/components/AppLayout';
import HomeSkeleton from '@/components/common/GlobalSkeleton/HomeSkeleton';
import { initFacebookPixel, trackPageView } from '@/lib/fbPixel';
import { fetchProducts } from '@/store/products.atom';
import ScrollToTop from '@/utils/ScrollToTop';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import 'react-medium-image-zoom/dist/styles.css';

export const Route = createFileRoute('/_app')({
	async beforeLoad() {
		// prefetch products before route loads
		await fetchProducts();

		return {}; // you can pass extra data here if needed
	},

	// This component shows while beforeLoad is running
	pendingComponent: () => <HomeSkeleton />,
	// This component shows after beforeLoad is done
	component: () => {
		useEffect(() => {
			initFacebookPixel(
				import.meta.env.VITE_APP_PIXEL_ID || '1487708375861000'
			); // Replace with your actual ID
			trackPageView(); // Track first page load
		}, []);

		return (
			<AppLayout>
				<ScrollToTop />
				<Outlet />
			</AppLayout>
		);
	},
});
