import { ModeToggler } from '@/components/ModeToggler';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackEvent } from '@/lib/fbPixel';
import { cartAtom } from '@/store/cart.atom';
import { colors } from '@/theme/color';
import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Search, ShoppingCart } from 'lucide-react';

export default function Navbar() {
	const { theme } = useTheme();
	const navigate = useNavigate();

	const [cart] = useAtom(cartAtom);

	const totalQuantity =
		cart.productsInCart?.reduce(
			(sum: any, item: any) => sum + (item.quantityDetails?.qty ?? 0),
			0
		) || 0;

	const subTotal = cart?.productsInCart?.reduce(
		(total: number, product: any) => {
			const detail = product.quantityDetails;
			const productTotal = (detail?.qty ?? 0) * (product.salePrice ?? 0);
			return total + productTotal;
		},
		0
	);

	return (
		<header className='px-3 md:px-6 sticky top-0 z-50 backdrop-blur bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-b-[#364153]'>
			<div className='container mx-auto  flex justify-between items-center gap-4 py-4'>
				{/* ✅ Logo */}
				<div className='flex items-center'>
					{theme === 'dark' ? (
						<img
							src='/white-logo.png'
							alt='logo'
							onClick={() => navigate({ to: '/' })}
							className='h-16 sm:h-22 w-auto object-contain cursor-pointer'
						/>
					) : (
						<img
							src='/dark-logo.png'
							alt='logo'
							onClick={() => navigate({ to: '/' })}
							className='h-16 sm:h-22 w-auto object-contain cursor-pointer'
						/>
					)}
				</div>

				{/* ✅ Desktop Search */}
				<div className='relative hidden md:block flex-1 max-w-2xl'>
					<Input
						placeholder='Search your shoe...'
						className='pl-9 text-purple-950 dark:text-white w-full py-3 md:py-6 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none '
						style={{ background: 'transparent' }}
					/>
					<Search
						className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4'
						style={{ color: colors.sub }}
					/>
				</div>

				{/* ✅ Action Buttons */}
				<div className='flex items-center gap-3 md:gap-5'>
					{/* Cart with Badge */}
					<div
						className='relative'
						onClick={() => {
							trackEvent('InitiateCheckout', {
								value: subTotal,
								currency: 'BDT',
								num_items: totalQuantity,
							});
							navigate({ to: '/checkout' });
						}}
					>
						<Button
							className='rounded-md cursor-pointer dark:text-[#FFD600]'
							variant='outline'
							size={'icon'}
						>
							<ShoppingCart className='h-4 w-4 md:h-5 md:w-5' />
						</Button>
						<span className='w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-semibold absolute -top-2 -right-2 bg-purple-950 dark:bg-[#FFD600] text-white dark:text-black text-[11px] md:text-[12px] rounded-full leading-none'>
							{totalQuantity}
						</span>
					</div>

					{/* Mobile Search */}
					{/* <Button
						className='block md:hidden rounded-md cursor-pointer dark:text-[#FFD600]'
						variant='outline'
						size={'icon'}
					>
						<Search className='h-4 w-4 md:h-5 md:w-5' />
					</Button> */}

					{/* Track Order */}
					{/* <Button
						variant='outline'
						className='rounded-md cursor-pointer dark:text-[#FFD600]'
						onClick={() => navigate({ to: '/track-order' })}
						size={'icon'}
					>
						<SearchCheck className='h-4 w-4 md:h-5 md:w-5' />
					</Button> */}

					{/* Theme Mode */}
					<ModeToggler />
				</div>
			</div>
		</header>
	);
}
