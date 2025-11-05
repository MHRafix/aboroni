import { productAtom } from '@/store/products.atom';
import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import CategoryShowcase from './~lib/components/CategroyShowcaseSection/CategroyShowcase';
import HeroSlider from './~lib/components/HeroSection/HeroSlider';
import ProductsSection from './~lib/components/Product/ProductsSection';

export const Route = createFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [data] = useAtom(productAtom);

	return (
		<div className='mt-5 container mx-auto px-4 md:px-0 overflow-hidden'>
			<HeroSlider />

			<ProductsSection
				title='Latest Collection'
				tagline='Explore our latest collections'
				products={data?.products}
				productCategories={data?.productsCategories}
			/>
			<CategoryShowcase />
			{/* <PromoBanner /> */}
			{/* <Testimonials /> */}
			{/* <NewsletterForm /> */}
		</div>
	);
}
