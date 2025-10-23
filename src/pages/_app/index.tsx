import { productAtom } from '@/store/products.atom';
import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import HeroSlider from './~lib/components/HeroSection/HeroSlider';
import ProductsSection from './~lib/components/Product/ProductsSection';
import { Testimonials } from './~lib/components/TestimonialsSection/Testimonials';

export const Route = createFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [data] = useAtom(productAtom);

	return (
		<div className='container mx-auto px-4 overflow-hidden'>
			<HeroSlider />

			<ProductsSection title='Latest Collection' products={data?.products} />
			{/* <PromoBanner /> */}
			<Testimonials />
			{/* <NewsletterForm /> */}
		</div>
	);
}
