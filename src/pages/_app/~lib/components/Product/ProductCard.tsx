import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/gql/graphql';
import { trackEvent } from '@/lib/fbPixel';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const ProductCard = ({ product }: { product: Product }) => {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4 }}
		>
			<Card
				onClick={() => {
					trackEvent('ViewProduct', {
						content_name: product?.title,
						content_type: 'product', // required by FB for product pages
						content_ids: [product?._id],
						contents: [
							{
								id: product?._id,
								name: product?.title,
								item_price: product?.salePrice,
							},
						],
						value: product?.salePrice,
						currency: 'BDT',
					});
					navigate({
						to: '/shop/$productId',
						params: { productId: product?._id! },
					});
				}}
				className='group p-0 bg-transparent shadow-none overflow-hidden border-0 transition-all duration-300 cursor-pointer'
			>
				<CardContent className='p-0'>
					<div className='relative aspect-square overflow-hidden'>
						<img
							src={product?.thumbnail?.externalUrl!}
							alt={product?.title}
							className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105`}
						/>
						{product?.regularPrice && (
							<Badge className='absolute top-2 left-2 dark:bg-[#FFD600] bg-[#fcce09] text-black font-medium w-[65px] h-7 text-md'>
								-{product?.regularPrice - product?.salePrice!} TK
							</Badge>
						)}
						{/* <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
							<Button variant={'outline'} size='icon' className='h-8 w-8'>
								<Heart className='h-4 w-4' />
							</Button>
						</div> */}
					</div>
					<div className='py-4 space-y-2'>
						<h3 className='font-medium text-sm lg:text-md'>{product.title}</h3>
						<div className='flex items-center space-x-2'>
							<span className='font-semibold  text-sm lg:text-lg dark:text-[#FFD600] text-[#fcce09]'>
								<span className='font-extrabold'>৳</span> {product?.salePrice}
							</span>
							{product.regularPrice && (
								<span className='text-sm font-semibold text-muted-foreground line-through'>
									<span className='font-extrabold'>৳</span>{' '}
									{product.regularPrice}
								</span>
							)}
						</div>
						{/* <div className='flex items-center space-x-1'>
							<div className='flex'>
								{[...Array(5)].map((_, i) => (
									<span
										key={i}
										className={`text-md ${i < Math.floor(5) ? 'text-yellow-400' : 'text-gray-300'}`}
									>
										★
									</span>
								))}
							</div> */}
						{/* <span className='text-xs text-muted-foreground'>({4.5})</span> */}
						{/* </div> */}
					</div>{' '}
					{/* <div className='w-full flex gap-2 opacity-100 transition'>
						<button
							className='flex items-center py-3 justify-center w-full font-medium text-md  bg-[#fcce09] cursor-pointer transition duration-300 hover:bg-[#443436]'
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
							<ShoppingBasketIcon className='!h-5 !w-5 mr-2' /> Buy Now
						</button>
					</div> */}
				</CardContent>
			</Card>{' '}
		</motion.div>
	);
};
// function getDiscountPercentage(
// 	regularPrice: number,
// 	salePrice: number
// ): number {
// 	return Math.ceil(((regularPrice - salePrice) / regularPrice) * 100);
// }
