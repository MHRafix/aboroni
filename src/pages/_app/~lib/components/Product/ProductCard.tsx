import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/gql/graphql';
import { trackEvent } from '@/lib/fbPixel';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ShoppingBasketIcon } from 'lucide-react';

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
					trackEvent('ViewContent', {
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
				className='group p-0 overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer'
			>
				<CardContent className='p-0'>
					<div className='relative aspect-square overflow-hidden'>
						<img
							src={product?.thumbnail?.externalUrl!}
							alt={product?.title}
							className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105`}
						/>
						{product?.regularPrice && (
							<Badge className='absolute top-3 left-3 dark:bg-[#FFD600] bg-purple-950 dark:text-black font-bold w-[140px] h-10 text-xl'>
								Save: {product?.regularPrice - product?.salePrice!} TK.
							</Badge>
						)}
						{/* <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'>
							<Button variant={'outline'} size='icon' className='h-8 w-8'>
								<Heart className='h-4 w-4' />
							</Button>
						</div> */}
					</div>
					<div className='p-4 space-y-2'>
						<h3 className='font-semibold text-lg'>{product.title}</h3>
						<div className='flex items-center space-x-2'>
							<span className='font-extrabold text-lg dark:text-[#FFD600] text-purple-950'>
								৳ {product?.salePrice}
							</span>
							{product.regularPrice && (
								<span className='text-sm font-bold text-muted-foreground line-through'>
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
					<div className='w-full flex gap-2 opacity-100 transition'>
						<button
							className='flex items-center py-3 justify-center w-full font-medium text-md  bg-purple-950 cursor-pointer transition duration-300 hover:bg-purple-800'
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
					</div>
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
