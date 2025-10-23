import { colors } from '@/theme/color';
import { ShoppingBasketIcon, ShoppingCart } from 'lucide-react';

const PromoBanner = () => {
	return (
		<section className='pb-16'>
			<div className='rounded-md p-4 md:p-12 dark:bg-muted/30 bg-white overflow-hidden'>
				<div className='grid md:grid-cols-2 gap-8 items-center'>
					<div>
						<h2
							className='text-3xl md:text-4xl font-extrabold mb-3 dark:text-white text-purple-950'
							// style={{ color: colors.text }}
						>
							Midnight Sale
						</h2>
						<p className='text-sm md:text-base mb-6 dark:text-[#C8B8FF] text-purple-950 leading-7'>
							Extra{' '}
							<span
								className='font-mono px-2 py-1 rounded'
								style={{ background: colors.accent, color: '#1A1030' }}
							>
								20% off
							</span>{' '}
							select styles. Use code{' '}
							<span
								className='font-mono px-2 py-1 rounded'
								style={{ background: colors.accent, color: '#1A1030' }}
							>
								NIGHT20
							</span>
						</p>
						<div className='flex gap-3'>
							<button className='flex items-center py-2.5 px-5 sm:px-8 justify-center font-medium text-md rounded-md cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500 text-black'>
								<ShoppingCart className='!h-6 !w-6 mr-2' /> Add to Cart
							</button>
							<button
								className='flex items-center py-2.5 justify-center px-5 sm:px-8 font-medium text-md rounded-md bg-purple-950 cursor-pointer transition duration-300 hover:bg-purple-800'
								style={{ color: 'white' }}
							>
								<ShoppingBasketIcon className='!h-6 !w-6 mr-2' /> Buy Now
							</button>
						</div>
					</div>
					<div className='relative'>
						<img
							src='https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop'
							alt='Promo'
							className='rounded-md h-56 md:h-72 w-full object-cover'
						/>
						<div
							className='absolute top-4 right-4 px-3 py-2 rounded-md font-bold'
							style={{ background: colors.accent, color: '#1A1030' }}
						>
							Up to 50% OFF
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoBanner;
