import { productAtom } from '@/store/products.atom';
import { colors } from '@/theme/color';
import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import {
	CircleCheckBig,
	ShieldCheck,
	ShoppingBasketIcon,
	ShoppingCart,
	Star,
	Truck,
} from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
// @ts-ignore
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Feature } from '../Features/FeatureCard';

const HeroSlider = () => {
	const [products] = useAtom(productAtom);
	const navigate = useNavigate();

	return (
		<section className='relative my-8'>
			<Swiper
				autoplay={{
					delay: 2000, // 2.5s per slide
					disableOnInteraction: false, // keep autoplay after interaction
				}}
				loop={true} // 🔄 infinite loop
				modules={[Autoplay]}
				className='mySwiper'
			>
				{products?.products?.map((product, idx) => (
					<SwiperSlide key={idx}>
						<div className='relative py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center'>
							<div className='block lg:hidden'>
								<div className='relative'>
									<div className='absolute -inset-6 rounded-[2rem] blur-2xl' />
									<div
										className='relative rounded-[2rem] overflow-hidden ring-1'
										// style={{ ringColor: colors.card }}
									>
										<Zoom>
											<img
												src={product?.thumbnail?.externalUrl!}
												alt='Hero shoe'
												className='w-full h-[330px] md:h-[550px] object-cover'
											/>
										</Zoom>
									</div>
								</div>
							</div>
							<div className='hidden lg:block'>
								<div className='inline-flex items-center space-x-2 bg-yellow-100 dark:bg-slate-800 text-accent-foreground px-3 py-2 rounded-full text-sm font-medium'>
									<Star className='h-4 w-4 fill-current' />
									<span>Premium Quality</span>
								</div>
								<br />
								<br />
								<h1
									className='text-4xl md:text-6xl dark:text-[#F5F3FF] text-purple-950 font-extrabold leading-tight mb-4'
									// style={{ color: colors.text }}
								>
									{product?.title.split(' ')[0]}{' '}
									<span style={{ color: colors.accent }}>
										{product?.title?.split(' ').slice(1, -1).join(' ')}{' '}
									</span>
									{
										product?.title?.split(' ')[
											product?.title?.split(' ').length - 1
										]
									}
								</h1>
								<p className='text-base md:text-lg dark:text-[#C8B8FF] text-purple-950 mb-8'>
									{product?.shortDescription}
								</p>
								<div className='flex gap-3'>
									<button
										className='flex items-center py-2.5 px-5 sm:px-8 justify-center font-medium text-md rounded-md cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500 text-black'
										onClick={() => {
											navigate({
												to: '/shop/$productId',
												params: {
													productId: product?._id!,
												},
											});
										}}
									>
										<ShoppingCart className='!h-6 !w-6 mr-2' /> Add to Cart
									</button>
									<button
										className='flex items-center py-2.5 justify-center px-5 sm:px-8 font-medium text-md rounded-md bg-purple-950 cursor-pointer transition duration-300 hover:bg-purple-800'
										style={{ color: 'white' }}
										onClick={() => {
											navigate({
												to: '/shop/$productId',
												params: {
													productId: product?._id!,
												},
											});
										}}
									>
										<ShoppingBasketIcon className='!h-6 !w-6 mr-2' /> Buy Now
									</button>
								</div>
								<div className='mt-10 grid lg:grid-cols-2 xl:grid-cols-3 gap-6'>
									<Feature
										icon={Truck}
										title='ফাস্ট ডেলিভারি'
										subtitle='১-৩ কার্যদিবস'
									/>
									<Feature
										icon={CircleCheckBig}
										title='১০০% চামড়া'
										subtitle='পিওর গরুর চামড়া'
									/>
									<Feature
										icon={ShieldCheck}
										title='নিশ্চিত গ্যারান্টি'
										subtitle='শর্ত প্রযোজ্য'
									/>
								</div>{' '}
							</div>
							<div className='hidden lg:block'>
								<div className='relative'>
									<div className='absolute -inset-6 rounded-[2rem] blur-2xl' />
									<div
										className='relative rounded-[2rem] overflow-hidden ring-1'
										// style={{ ringColor: colors.card }}
									>
										<Zoom>
											<img
												src={product?.thumbnail?.externalUrl!}
												alt='Hero shoe'
												className='w-full h-[550px] object-cover'
											/>
										</Zoom>
									</div>
								</div>
							</div>
							<div className='block lg:hidden'>
								<div className='inline-flex items-center space-x-2 bg-yellow-100 dark:bg-slate-800 text-accent-foreground px-3 py-2 rounded-full text-sm font-medium'>
									<Star className='h-4 w-4 fill-current' />
									<span>Premium Quality</span>
								</div>
								<br />
								<br />
								<h1
									className='text-4xl md:text-6xl dark:text-[#F5F3FF] text-purple-950 font-extrabold leading-tight mb-4'
									// style={{ color: colors.text }}
								>
									Leather{' '}
									<span style={{ color: colors.accent }}>
										{product?.title}{' '}
									</span>
									Shoe
								</h1>
								<p className='text-base md:text-lg dark:text-[#C8B8FF] text-purple-950 mb-8'>
									{product?.shortDescription}
								</p>
								<div className='flex gap-3'>
									<button
										className='flex items-center py-2.5 px-5 sm:px-8 justify-center font-medium text-md rounded-md cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500 text-black'
										onClick={() => {
											navigate({
												to: '/shop/$productId',
												params: {
													productId: product?._id!,
												},
											});
										}}
									>
										<ShoppingCart className='!h-6 !w-6 mr-2' /> Add to Cart
									</button>{' '}
									<button
										className='flex items-center py-2.5 justify-center px-5 sm:px-8 font-medium text-md rounded-md bg-purple-950 cursor-pointer transition duration-300 hover:bg-purple-800'
										style={{ color: 'white' }}
										onClick={() => {
											navigate({
												to: '/shop/$productId',
												params: {
													productId: product?._id!,
												},
											});
										}}
									>
										<ShoppingBasketIcon className='!h-6 !w-6 mr-2' /> Buy Now
									</button>
								</div>
								<div className='mt-10 grid lg:grid-cols-2 xl:grid-cols-3 gap-6'>
									<Feature
										icon={Truck}
										title='ফাস্ট ডেলিভারি'
										subtitle='১-৩ কার্যদিবস'
									/>
									<Feature
										icon={CircleCheckBig}
										title='১০০% চামড়া'
										subtitle='পিওর গরুর চামড়া'
									/>
									<Feature
										icon={ShieldCheck}
										title='নিশ্চিত গ্যারান্টি'
										subtitle='শর্ত প্রযোজ্য'
									/>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default HeroSlider;
