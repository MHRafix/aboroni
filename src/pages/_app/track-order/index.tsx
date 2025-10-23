import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
	ArrowLeft,
	ClockIcon,
	MapPinIcon,
	PackageCheckIcon,
	SearchCheck,
	TruckIcon,
} from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/_app/track-order/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [inputId, setInputId] = useState('');
	const [submittedId, setSubmittedId] = useState<string | null>(null);

	// Mock tracking steps (replace with real API data)
	const steps = [
		{
			title: 'Order Placed',
			description: 'We received your order.',
			icon: <PackageCheckIcon className='h-5 w-5' />,
			status: 'done',
		},
		{
			title: 'Processing',
			description: 'Your order is being prepared.',
			icon: <ClockIcon className='h-5 w-5' />,
			status: 'done',
		},
		{
			title: 'Shipped',
			description: 'Your package is on the way.',
			icon: <TruckIcon className='h-5 w-5' />,
			status: 'current',
		},
		{
			title: 'Out for Delivery',
			description: 'Courier is heading to your location.',
			icon: <MapPinIcon className='h-5 w-5' />,
			status: 'pending',
		},
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputId.trim()) {
			setSubmittedId(inputId.trim());
		}
	};

	return (
		<div className='relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#0B061A] dark:to-[#0B061A] text-slate-900 dark:text-slate-100'>
			<div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
				<div className='w-full rounded-2xl bg-white/80 dark:bg-[#1A1030] backdrop-blur border border-slate-200/60 dark:border-purple-800 shadow-xl p-6 sm:p-10'>
					<h1 className='text-center text-2xl sm:text-3xl font-semibold tracking-tight'>
						Order Tracking
					</h1>
					<p className='mt-3 text-center text-sm sm:text-base text-slate-600 dark:text-slate-300'>
						Enter your Order ID to view the status of your order.
					</p>

					{/* Order ID Form */}
					<form
						onSubmit={handleSubmit}
						className='mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'
					>
						<Input
							type='text'
							placeholder='Enter Order ID'
							value={inputId}
							onChange={(e) => setInputId(e.target.value)}
							className='flex-1 rounded-md  border border-slate-300 dark:border-purple-800 bg-white dark:bg-[#140a29] px-4 py-6 text-sm sm:text-base focus:outline-none focus:ring-purple-500'
						/>
						<Button
							disabled={!inputId}
							type='submit'
							className='cursor-pointer rounded-md px-5 py-6 text-sm font-medium bg-purple-950 hover:bg-purple-900 text-white transition focus:outline-none focus:ring-2  focus:ring-purple-900'
						>
							<SearchCheck /> Track Order
						</Button>
					</form>

					{submittedId && (
						<div className='mt-12'>
							{/* Order ID Display */}
							<div className='flex justify-center mb-10'>
								<div className='flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 dark:border-purple-800 bg-white dark:bg-[#140a29] px-4 py-2'>
									<span className='text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400'>
										Order ID
									</span>
									<code className='break-all text-sm sm:text-base font-mono font-semibold'>
										{submittedId}
									</code>
								</div>
							</div>

							{/* Tracking Steps */}
							<ol className='space-y-6'>
								{steps.map((step, i) => (
									<li key={i} className='flex items-start gap-4'>
										<div
											className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border-2 ${
												step.status === 'done'
													? 'bg-emerald-100 border-emerald-500 text-emerald-600'
													: step.status === 'current'
														? 'bg-yellow-100 border-yellow-500 text-yellow-600 animate-pulse'
														: 'bg-slate-100 border-slate-300 text-slate-400'
											}`}
										>
											{step.icon}
										</div>
										<div>
											<h3 className='text-sm sm:text-base font-medium'>
												{step.title}
											</h3>
											<p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400'>
												{step.description}
											</p>
										</div>
									</li>
								))}
							</ol>

							{/* Actions */}
							<div className='mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
								<Link
									to='/'
									className='w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium bg-purple-950 hover:bg-purple-900 text-white transition focus:outline-none focus:ring-2'
								>
									<ArrowLeft /> &nbsp; Back to Shop
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
