import { Headphones, RotateCcw, Shield, Truck } from 'lucide-react';

const features = [
	{
		icon: Truck,
		title: 'Fast Shipping',
		description: 'Free delivery on orders over ৳1500 nationwide',
	},
	{
		icon: Shield,
		title: 'Quality Guarantee',
		description: '100% authentic products with quality assurance',
	},
	{
		icon: RotateCcw,
		title: 'Easy Returns',
		description: '30-day hassle-free return and exchange policy',
	},
	{
		icon: Headphones,
		title: '24/7 Support',
		description: 'Round-the-clock customer service assistance',
	},
];

export function WhyChooseUs() {
	return (
		<section className='py-16 lg:py-24'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center space-y-4 mb-12'>
					<h2 className='text-3xl lg:text-4xl font-bold text-balance'>
						Why Choose LOAFINITY?
					</h2>
					<p className='text-lg text-muted-foreground text-pretty max-w-2xl mx-auto'>
						We're committed to providing the best shopping experience with
						premium quality and exceptional service.
					</p>
				</div>

				<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
					{features.map((feature, index) => (
						<div
							key={index}
							className='text-center space-y-4 bg-white shadow-md p-5 rounded-md'
						>
							<div className='mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center'>
								<feature.icon className='h-8 w-8 text-purple-950' />
							</div>
							<div className='space-y-2'>
								<h3 className='text-xl font-semibold text-purple-950'>
									{feature.title}
								</h3>
								<p className='text-muted-foreground text-sm text-pretty'>
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
