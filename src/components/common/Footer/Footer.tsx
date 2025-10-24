import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
	return (
		<footer className='bg-card border-t border-border py-12 lg:py-16'>
			<div className='container px-4 md:px-0 mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12'>
					{/* Brand */}
					<div className='space-y-4'>
						<h3 className='font-serif text-2xl font-semibold'>Aboroni</h3>
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
					<p>&copy; {new Date().getFullYear()} Aboroni. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
