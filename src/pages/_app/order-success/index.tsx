import { createFileRoute, Link } from '@tanstack/react-router';
import {
	ArrowLeft,
	Check,
	CircleCheckBigIcon,
	CopyIcon,
	SearchCheck,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Confetti from 'react-confetti';

export const Route = createFileRoute('/_app/order-success/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [copied, setCopied] = useState(false);
	const { width, height } = useWindowSize();

	// Example: read orderId from query string
	const orderId = useMemo(() => {
		if (typeof window !== 'undefined') {
			return new URLSearchParams(window.location.search).get('orderId') || '—';
		}
		return '—';
	}, []);

	useEffect(() => {
		if (copied) {
			const t = setTimeout(() => setCopied(false), 1500);
			return () => clearTimeout(t);
		}
	}, [copied]);

	const handleCopy = async () => {
		if (!orderId || orderId === '—') return;
		try {
			await navigator.clipboard.writeText(orderId);
			setCopied(true);
		} catch (e) {
			console.error('Copy failed', e);
		}
	};

	return (
		<div className='relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:text-slate-100'>
			{/* Confetti */}
			<Confetti
				width={width}
				height={height}
				numberOfPieces={300}
				recycle={false}
			/>

			<div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex items-center justify-center'>
				<div className='w-full rounded-2xl bg-white/80 dark:bg-[#1A1030] backdrop-blur border border-slate-200/60 dark:border-[#443436] shadow-xl p-6 sm:p-10'>
					{/* Badge */}
					<div className='flex items-center justify-center'>
						<div className='h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center ring-8 ring-emerald-50 dark:ring-emerald-900/30'>
							<CircleCheckBigIcon className='h-9 w-9 text-emerald-600 dark:text-emerald-400' />
						</div>
					</div>

					<h1 className='mt-6 text-center text-2xl sm:text-3xl font-semibold tracking-tight'>
						Thank you! Your order was placed successfully.
					</h1>
					<p className='mt-3 text-center text-sm sm:text-base text-slate-600 dark:text-slate-300'>
						We’ve sent a confirmation email with your order details. You can
						track or manage your order anytime.
					</p>

					{/* Order ID */}
					<div className='mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center'>
						<div className='flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 dark:border-[#443436] bg-white dark:bg-[#140a29] px-4 py-3'>
							<span className='text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400'>
								Order ID
							</span>
							<code className='break-all text-sm sm:text-base font-mono font-semibold'>
								{orderId}
							</code>
						</div>
						<button
							onClick={handleCopy}
							className='inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium border border-slate-200 dark:border-[#443436] bg-slate-50 hover:bg-slate-100 dark:bg-[#140a29] dark:hover:bg-[#1A1030] transition focus:outline-none focus:ring-2 focus:ring-emerald-500'
						>
							{copied ? (
								<span className='inline-flex items-center gap-2'>
									<Check className='h-4 w-4' /> Copied
								</span>
							) : (
								<span className='inline-flex items-center gap-2'>
									<CopyIcon className='h-4 w-4' /> Copy
								</span>
							)}
						</button>
					</div>

					{/* Actions */}
					<div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
						<Link
							to='/'
							className='w-full sm:w-auto inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium bg-[#fcce09] text-black transition focus:outline-none focus:ring-2 focus:ring-offset-2'
						>
							<ArrowLeft /> &nbsp; Continue Shopping
						</Link>
						<Link
							to={`/track-order`}
							className='w-full sm:w-auto inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium border border-slate-200 dark:border-[#443436] bg-white hover:bg-slate-50 dark:bg-[#140a29] dark:hover:bg-[#1A1030] transition focus:outline-none'
						>
							<SearchCheck /> &nbsp; Track Order
						</Link>
					</div>

					{/* Tips */}
					<div className='mt-8 text-center text-xs text-slate-500 dark:text-slate-400'>
						Keep this Order ID for support and tracking.
					</div>
				</div>
			</div>
		</div>
	);
}

function useWindowSize() {
	const isClient = typeof window !== 'undefined';
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (!isClient) return;
		const onResize = () =>
			setSize({ width: window.innerWidth, height: window.innerHeight });
		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, [isClient]);

	return size;
}
