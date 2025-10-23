import { Button } from '@/components/ui/button';
import { Product } from '@/gql/graphql';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { ProductCard } from './ProductCard';

const ProductsSection: FC<{
	title?: string;
	tagline?: string;
	products: Product[];
}> = ({ title = 'লেটেস্ট কালেকশন', tagline, products }) => {
	return (
		<section className='my-16'>
			<div className='flex items-center justify-between w-full mb-5'>
				<div className='space-y-2'>
					<h2 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
						{title}
					</h2>
					{tagline && (
						<p className='text-sm md:text-md lg:text-lg text-muted-foreground'>
							{tagline}
						</p>
					)}
				</div>
				{title !== 'রিলেটেড প্রোডাক্টস' && (
					<Button variant='outline' className='cursor-pointer'>
						View All <ArrowRight />
					</Button>
				)}
			</div>
			<div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
				{products?.map((product: Product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</section>
	);
};

export default ProductsSection;
