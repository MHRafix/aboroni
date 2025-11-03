import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CategoryShowcase = () => {
	return (
		<section className='py-8 lg:py-24 my-5 rounded-md dark:bg-[#2c2b2b] bg-[#F5F5F5]'>
			<div className='px-4 lg:px-8'>
				<div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
					{/* Content */}
					<div className='space-y-6 lg:space-y-8'>
						<div>
							<p className='text-sm uppercase tracking-wider text-muted-foreground mb-2'>
								New Season
							</p>
							<h2 className='font-serif text-3xl lg:text-5xl font-semibold mb-4'>
								Essential
								<br />
								Wardrobe Pieces
							</h2>
							<p className='text-muted-foreground text-lg'>
								Build a versatile wardrobe with our carefully selected
								essentials. Each piece is designed to be timeless, comfortable,
								and effortlessly stylish.
							</p>
						</div>

						<div className='flex flex-wrap gap-4'>
							<Button
								size='lg'
								className='group bg-[#FFD600] hover:bg-yellow-500 text-black'
							>
								Shop Essentials
								<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Button>
							<Button size='lg' variant='outline'>
								View All Categories
							</Button>
						</div>
					</div>

					{/* Stats Grid */}
					<div className='grid grid-cols-2 gap-6'>
						<div className='bg-background p-6 lg:p-8 rounded-lg shadow-sm'>
							<p className='font-serif text-4xl lg:text-5xl font-semibold mb-2'>
								500+
							</p>
							<p className='text-muted-foreground'>Curated Products</p>
						</div>
						<div className='bg-background p-6 lg:p-8 rounded-lg shadow-sm'>
							<p className='font-serif text-4xl lg:text-5xl font-semibold mb-2'>
								50+
							</p>
							<p className='text-muted-foreground'>Designer Brands</p>
						</div>
						<div className='bg-background p-6 lg:p-8 rounded-lg shadow-sm'>
							<p className='font-serif text-4xl lg:text-5xl font-semibold mb-2'>
								4.9
							</p>
							<p className='text-muted-foreground'>Average Rating</p>
						</div>
						<div className='bg-background p-6 lg:p-8 rounded-lg shadow-sm'>
							<p className='font-serif text-4xl lg:text-5xl font-semibold mb-2'>
								24/7
							</p>
							<p className='text-muted-foreground'>Customer Support</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CategoryShowcase;
