import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/gql/graphql';
import { trackEvent } from '@/lib/fbPixel';
import { cartAtom } from '@/store/cart.atom';
import { fetchProduct, productAtom } from '@/store/products.atom';
import { handleCart } from '@/utils/handleCart';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Minus, Plus, ShoppingBasketIcon, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';

import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductsSection from '../~lib/components/Product/ProductsSection';

import { Badge } from '@/components/ui/badge';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/free-mode';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/thumbs';

export const Route = createFileRoute('/_app/shop/$productId')({
	async beforeLoad({ params }) {
		await fetchProduct(params.productId);
		return {};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams(); // <-- get dynamic id here

	const navigate = useNavigate();
	const [, setCartList] = useAtom(cartAtom);
	const [data] = useAtom(productAtom);
	const [selectedColor, setSelectedColor] = useState(
		data?.product?.colors?.[0]?.color
	);
	const [selectedSize, setSelectedSize] = useState(
		data?.product?.sizes?.[0]?.size
	);
	const [quantity, setQuantity] = useState(1);

	const handleQuantity = (type: 'inc' | 'dec') => {
		setQuantity((prev) => {
			if (type === 'dec') return prev > 1 ? prev - 1 : 1;
			return prev + 1;
		});
	};
	const [thumbsSwiper, setThumbsSwiper] = useState<any>('');
	return (
		<div className='container mx-auto mt-20'>
			<div className='my-5 p-2 grid grid-cols-1 xl:grid-cols-2 gap-6'>
				{/* Product Image */}
				<div className='grid border dark:border-[#fcce09] border-gray-200 p-5 rounded-md'>
					{/* <img
						src={data?.product?.thumbnail?.externalUrl!}
						alt='product-image'
						className={`w-full h-[400px] md:h-[550px] rounded-md mx-auto object-cover`}
					/> */}{' '}
					{/* Main slider */}
					<Swiper
						spaceBetween={10}
						navigation={true}
						thumbs={{
							swiper:
								thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
						}}
						modules={[FreeMode, Navigation, Thumbs, Autoplay]}
						className='mb-2'
					>
						{data?.product?.carouselImages?.map((src, i) => (
							<SwiperSlide key={i}>
								<Zoom>
									<div className='relative'>
										<img
											src={src?.externalUrl!}
											alt={`Product ${i}`}
											className={`w-full h-[400px] md:h-[550px] rounded-md mx-auto object-cover`}
										/>
										{data?.product?.brand?.name && (
											<Badge className='absolute top-3 left-3 dark:bg-[#FFD600] bg-[#fcce09] text-black font-medium w-[65px] h-7 text-md'>
												-
												{data?.product?.regularPrice -
													data?.product?.salePrice!}{' '}
												TK
											</Badge>
										)}
									</div>
								</Zoom>
							</SwiperSlide>
						))}
					</Swiper>
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={3}
						slidesPerView={5}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className='cursor-pointer'
					>
						{data?.product?.carouselImages?.map((src, i) => (
							<SwiperSlide key={i}>
								<img
									src={src?.externalUrl!}
									alt={`Thumb ${i}`}
									className={`w-full h-[70px] md:h-[120px] rounded-md mx-auto object-cover hover:scale-90 border border-gray-200`}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>{' '}
				{/* Product Details */}
				<div className='border dark:border-[#fcce09] border-gray-200 p-5 rounded-md'>
					<h2 className='text-2xl md:text-3xl font-bold text-[#fcce09] dark:text-white mb-2'>
						{data?.product?.title || 'N/A'}
					</h2>

					<div className='flex items-center space-x-2'>
						<span className='font-extrabold text-3xl md:text-4xl dark:text-[#FFD600] text-[#fcce09]'>
							৳ {data?.product?.salePrice}
						</span>
						{data?.product?.regularPrice && (
							<span className='text-lg mt-5 ml-2 font-bold text-muted-foreground line-through'>
								<span className='font-extrabold'>৳</span>{' '}
								{data?.product.regularPrice}
							</span>
						)}
					</div>
					<div className='space-y-6 mt-3'>
						{/* Color Options */}
						{data?.product?.colors?.length ? (
							<div>
								<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
									Choose Color
								</h3>
								<div className='flex flex-wrap gap-3'>
									{data?.product?.colors?.map((color, idx) => (
										<button
											key={idx}
											onClick={() => setSelectedColor(color?.color)}
											className={`cursor-pointer px-4 py-2 border rounded-md transition duration-300 
											${
												selectedColor === color?.color
													? 'bg-[#fcce09] text-white dark:bg-yellow-400 dark:text-black'
													: 'bg-gray-100 text-gray-700 dark:bg-transparent dark:text-gray-200 hover:[#fcce09] dark:hover:bg-[#443436]'
											}`}
										>
											{color?.color}
										</button>
									))}
								</div>
								<p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
									Selected: {selectedColor}
								</p>
							</div>
						) : null}
						{/* Size Options */}
						{data?.product?.sizes?.length ? (
							<div>
								<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
									Choose Size
								</h3>
								<div className='flex flex-wrap gap-3'>
									{data?.product?.sizes?.map((size, idx) => (
										<button
											key={idx}
											onClick={() => setSelectedSize(size?.size)}
											className={`px-4 py-2 rounded-lg border font-medium cursor-pointer transition duration-300 
											${
												selectedSize === size?.size
													? 'bg-[#fcce09] text-white dark:bg-yellow-400 dark:text-black'
													: 'bg-gray-100 text-gray-700 dark:bg-transparent dark:text-gray-200 hover:[#fcce09] dark:hover:bg-[#443436]'
											}`}
										>
											{size?.size}
										</button>
									))}
								</div>
								<p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
									Selected: {selectedSize}
								</p>
							</div>
						) : null}

						{/* Quantity Selector */}
						<div>
							<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
								Quantity
							</h3>
							<div className='flex items-center space-x-3'>
								<button
									onClick={() => handleQuantity('dec')}
									className='p-3 rounded-lg bg-gray-100 dark:bg-transparent text-md font-bold cursor-pointer border transition duration-300 hover:[#fcce09] dark:hover:bg-[#443436]'
								>
									<Minus className='w-5 h-5' />
								</button>
								<input
									type='text'
									value={quantity}
									readOnly
									className='w-14 text-center border rounded-lg py-3 bg-gray-100 dark:bg-transparent dark:text-white'
								/>
								<button
									onClick={() => handleQuantity('inc')}
									className='p-3 rounded-lg bg-gray-100 dark:bg-transparent text-md font-bold cursor-pointer border transition duration-300 hover:[#fcce09] dark:hover:bg-[#443436]'
								>
									<Plus className='w-5 h-5' />
								</button>
							</div>
						</div>

						{/* Buttons */}
						<div className='w-full mt-4 flex flex-col sm:flex-row gap-3'>
							<button
								className='flex items-center py-2.5 justify-center w-full sm:w-1/2 font-medium text-md rounded-md cursor-pointer transition duration-300 bg-[#FFD600] hover:bg-yellow-500 text-black'
								onClick={() => {
									trackEvent('AddToCart', {
										content_name: data?.product?.title,
										value: data?.product?.salePrice,
										currency: 'BDT',
										content_ids: [data?.product?._id], // product ID is required
										contents: [
											{
												id: data?.product?._id,
												quantity: quantity || 1, // default to 1 if quantity is undefined
												item_price: data?.product?.salePrice,
												name: data?.product?.title,
											},
										],
									});

									handleCart(
										data?.product!,
										setCartList,
										{
											qty: quantity,
											color: selectedColor,
											size: selectedSize,
										},
										'increase'
									);
								}}
							>
								<ShoppingCart className='!h-6 !w-6 mr-2' /> Add to Cart
							</button>
							<button
								className='flex items-center py-2.5 justify-center w-full sm:w-1/2 font-medium text-md rounded-md bg-[#fcce09] cursor-pointer transition duration-300 hover:bg-yellow-600 !text-black'
								style={{ color: 'white' }}
								onClick={() => {
									trackEvent('AddToCart', {
										content_name: data?.product?.title,
										value: data?.product?.salePrice,
										currency: 'BDT',
										content_ids: [data?.product?._id], // product ID is required
										contents: [
											{
												id: data?.product?._id,
												quantity: quantity || 1, // default to 1 if quantity is undefined
												item_price: data?.product?.salePrice,
												name: data?.product?.title,
											},
										],
									});
									handleCart(
										data?.product!,
										setCartList,
										{
											qty: quantity,
											color: selectedColor,
											size: selectedSize,
										},
										'increase'
									);

									navigate({
										to: '/checkout',
									});
								}}
							>
								<ShoppingBasketIcon className='!h-6 !w-6 mr-2' /> Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-2 my-8 border dark:border-[#fcce09] border-gray-200 rounded-md p-2'>
				<Tabs defaultValue='description' className='!w-full'>
					<TabsList className=' !w-full rounded-none'>
						<TabsTrigger className='p-4' value='description'>
							Description
						</TabsTrigger>
						<TabsTrigger className='p-4' value='additional_info'>
							Additional Information
						</TabsTrigger>
					</TabsList>
					<TabsContent value='description' className='px-3 my-5'>
						<div
							dangerouslySetInnerHTML={{ __html: data?.product?.description! }}
						></div>
					</TabsContent>
					<TabsContent value='additional_info' className='space-y-4 px-3 my-5'>
						{data?.product?.sizes?.length ? (
							<div>
								<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
									Available Sizes:
								</h3>
								<div className='flex flex-wrap gap-3'>
									{data?.product?.sizes?.map((size, idx) => (
										<button
											key={idx}
											onClick={() => setSelectedSize(size?.size)}
											className={`px-4 py-2 rounded-lg border font-medium cursor-pointer transition duration-300 
											bg-[#fcce09] text-white dark:bg-yellow-400 dark:text-black`}
										>
											{size?.size}
										</button>
									))}
								</div>
							</div>
						) : null}
						{data?.product?.colors?.length ? (
							<div>
								<h3 className='text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2'>
									Available Colors:
								</h3>
								<div className='flex flex-wrap gap-3'>
									{data?.product?.colors?.map((color, idx) => (
										<button
											key={idx}
											onClick={() => setSelectedColor(color?.color)}
											className={`px-4 py-2 rounded-lg border font-medium cursor-pointer transition bg-[#fcce09] text-white dark:bg-yellow-400 dark:text-black`}
										>
											{color?.color}
										</button>
									))}
								</div>
							</div>
						) : null}
					</TabsContent>
				</Tabs>
			</div>
			<div className='mx-2'>
				<ProductsSection
					title='রিলেটেড প্রোডাক্টস'
					products={
						data?.products?.filter((product) => product?._id !== productId) as [
							Product,
						]
					}
				/>
			</div>
		</div>
	);
}
