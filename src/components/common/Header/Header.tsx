import { ModeToggler } from '@/components/ModeToggler';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/fbPixel';
import { cartAtom } from '@/store/cart.atom';
import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
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

	const { theme } = useTheme();

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
			<div className='container md:px-0 px-3 mx-auto'>
				<div className='flex items-center justify-between h-16 lg:h-20'>
					<div className='flex items-center'>
						{theme === 'dark' ? (
							<img
								src='/dark-logo.png'
								alt='logo'
								onClick={() => navigate({ to: '/' })}
								className='h-12 sm:h-15 w-auto object-contain cursor-pointer'
							/>
						) : (
							<img
								src='/white-logo.png'
								alt='logo'
								onClick={() => navigate({ to: '/' })}
								className='h-12 sm:h-15 w-auto object-contain cursor-pointer'
							/>
						)}
					</div>

					{/* Desktop Navigation */}
					{/* <div className='hidden lg:flex items-center gap-8'>
						<a
							href='#'
							className='text-sm font-medium hover:text-foreground/80 transition-colors'
						>
							New Arrivals
						</a>
						<a
							href='#'
							className='text-sm font-medium hover:text-foreground/80 transition-colors'
						>
							Women
						</a>
						<a
							href='#'
							className='text-sm font-medium hover:text-foreground/80 transition-colors'
						>
							Men
						</a>
						<a
							href='#'
							className='text-sm font-medium hover:text-foreground/80 transition-colors'
						>
							Collections
						</a>
					</div> */}

					{/* Actions */}
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
							<span className='w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-semibold absolute -top-2 -right-2 bg-[#2b1e20] dark:bg-[#FFD600] text-white dark:text-black text-[11px] md:text-[12px] rounded-full leading-none'>
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
			</div>
		</nav>
	);
};

export default Navbar;
