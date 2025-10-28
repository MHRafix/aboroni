import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Product } from '@/gql/graphql';
import { FC, useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

const ProductsSection: FC<{
	title?: string;
	tagline?: string;
	products: Product[];
}> = ({ title = 'লেটেস্ট কালেকশন', tagline, products }) => {
	const [searchProducts, setSearchProducts] = useState<Product[]>(products);

	const handleSearch = (keyword: string) => {
		const result = products.filter((product) =>
			product?.title.toLowerCase().includes(keyword.toLowerCase())
		);
		setSearchProducts(result);
	};

	useEffect(() => {
		setSearchProducts(products);
	}, [products]);
	return (
		<section className='my-16'>
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
						<Input
							onChange={(e) => handleSearch(e.target.value)}
							className='md:w-[300px] py-6'
							placeholder='Search your products...'
						/>{' '}
						<Select>
							<SelectTrigger className='w-full py-6'>
								<SelectValue placeholder='Filter by category' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='all'>All</SelectItem>
									<SelectItem value='ladys'>Ladys</SelectItem>
									<SelectItem value='gents'>Gents</SelectItem>
									<SelectItem value='kids'>Kids</SelectItem>
									<SelectItem value='general'>General</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				)}
			</div>
			<div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-5 md:gap-9'>
				{searchProducts && searchProducts.length > 0 ? (
					searchProducts.map((product: Product) => (
						<ProductCard key={product._id} product={product} />
					))
				) : (
					<div className='col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4'>
						<img
							src='empty-box.png'
							alt='No products found'
							className='w-40 h-40 opacity-70'
						/>
						<h2 className='text-2xl font-bold text-gray-700'>
							No Products Found
						</h2>
						<p className='text-gray-500'>
							We couldn't find any products matching your search.
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductsSection;
