import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Product } from '@/gql/graphql';
import { FC } from 'react';
import { ProductCard } from './ProductCard';

const ProductsSection: FC<{
	title?: string;
	tagline?: string;
	products: Product[];
}> = ({ title = 'লেটেস্ট কালেকশন', tagline, products }) => {
	return (
		<section className='mb-16'>
			<div className='md:flex items-center space-y-3 justify-between w-full mb-5'>
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
					<div className='grid md:grid-cols-2 gap-5'>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Filter by category' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>Apple</SelectItem>
									<SelectItem value='banana'>Banana</SelectItem>
									<SelectItem value='blueberry'>Blueberry</SelectItem>
									<SelectItem value='grapes'>Grapes</SelectItem>
									<SelectItem value='pineapple'>Pineapple</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Sort By' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>Sale Products</SelectItem>
									<SelectItem value='banana'>New Arrival</SelectItem>
									<SelectItem value='blueberry'>Trending Products</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>{' '}
					</div>
				)}
			</div>
			<div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5 md:gap-9'>
				{products?.map((product: Product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</section>
	);
};

export default ProductsSection;
