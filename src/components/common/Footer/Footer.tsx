import { useTheme } from '@/components/providers/ThemeProvider';
import { useNavigate } from '@tanstack/react-router';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
	const { theme } = useTheme();
	const navigate = useNavigate();

	return (
		<footer className='bg-background border-t border-border py-12 lg:py-16'>
			<div className='container px-4 md:px-0 mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12'>
					{/* Brand */}
					<div className='space-y-4'>
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
						</div>{' '}
						<p className='text-muted-foreground text-sm'>
							Timeless fashion for the modern wardrobe. Discover pieces that
							define your unique style.
						</p>
						<div className='flex gap-4'>
							<a
								href='#'
								className='text-muted-foreground hover:text-foreground transition-colors'
							>
								<Instagram className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='text-muted-foreground hover:text-foreground transition-colors'
							>
								<Facebook className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='text-muted-foreground hover:text-foreground transition-colors'
							>
								<Twitter className='h-5 w-5' />
							</a>
						</div>
					</div>

					{/* Shop */}
					<div>
						<h4 className='font-medium mb-4'>Shop</h4>
						<ul className='space-y-3 text-sm text-muted-foreground'>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									New Arrivals
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Women
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Men
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Collections
								</a>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className='font-medium mb-4'>Customer Service</h4>
						<ul className='space-y-3 text-sm text-muted-foreground'>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Contact Us
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Shipping & Returns
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Size Guide
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									FAQs
								</a>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className='font-medium mb-4'>Company</h4>
						<ul className='space-y-3 text-sm text-muted-foreground'>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									About Us
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Sustainability
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Privacy Policy
								</a>
							</li>
							<li>
								<a href='#' className='hover:text-foreground transition-colors'>
									Terms of Service
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className='pt-8 border-t border-border text-center text-sm text-muted-foreground'>
					<p>&copy; {new Date().getFullYear()} Aborony. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
