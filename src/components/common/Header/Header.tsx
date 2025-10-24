import { ModeToggler } from '@/components/ModeToggler';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/fbPixel';
import { cartAtom } from '@/store/cart.atom';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Menu, ShoppingCart } from 'lucide-react';

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

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
			<div className='container md:px-0 px-3 mx-auto'>
				<div className='flex items-center justify-between h-16 lg:h-20'>
					{/* Mobile Menu */}
					<Button variant='ghost' size='icon' className='lg:hidden'>
						<Menu className='!h-7 !w-7' />
					</Button>

					{/* Logo */}
					<Link
						to='/'
						className='font-serif text-2xl lg:text-3xl font-semibold tracking-tight'
					>
						Aboroni
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden lg:flex items-center gap-8'>
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
					</div>

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
			</div>
		</nav>
	);
};

export default Navbar;
