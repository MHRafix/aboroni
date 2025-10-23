import { Button } from '@/components/ui/button';
import { Product } from '@/gql/graphql';
import { cartAtom } from '@/store/cart.atom';
import { handleCart, handleRemoveFromCart } from '@/utils/handleCart';
import { useAtom } from 'jotai';
import { Minus, Plus } from 'lucide-react';
import { FC } from 'react';

const CartItem: FC<{
	product: Product;
}> = ({ product }) => {
	const [, setCartList] = useAtom(cartAtom);

	// @ts-ignore
	const totalQty = product?.quantityDetails?.qty;

	return (
		<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b dark:border-gray-700 pb-3'>
			{/* Left section */}
			<div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
				<img
					src={product?.thumbnail?.externalUrl!}
					alt='product'
					className='w-24 h-22 rounded-md border object-cover'
				/>
				<div className='flex flex-col gap-2'>
					<p className='text-md font-medium text-purple-950 dark:text-white'>
						{product?.title || 'N/A'}
					</p>
					<div className='flex gap-2 items-center'>
						{' '}
						<p className='text-sm font-medium text-gray-600 dark:text-white'>
							Size:{' '}
							{
								// @ts-ignore
								product?.quantityDetails?.size
							}
						</p>
						<p className='text-sm font-medium text-gray-600 dark:text-white'>
							Color:{' '}
							{
								// @ts-ignore
								product?.quantityDetails?.color
							}
						</p>
					</div>
					<div className='flex items-center gap-3'>
						<h3 className='text-md font-semibold text-purple-950 dark:text-gray-200'>
							Qty
						</h3>
						<div className='flex items-center space-x-2'>
							<QtyButton
								type='dec'
								onClick={() =>
									handleCart(
										product,
										setCartList,
										{
											qty: 1,
											// @ts-ignore
											color: product?.quantityDetails?.color,
											// @ts-ignore
											size: product?.quantityDetails?.size,
										},
										'decrease'
									)
								}
							/>
							<input
								type='text'
								// @ts-ignore
								value={totalQty}
								readOnly
								className='w-8 h-8 text-center border rounded-md bg-gray-100 dark:bg-transparent text-purple-950 dark:text-white'
							/>
							<QtyButton
								type='inc'
								onClick={() =>
									handleCart(
										product,
										setCartList,
										{
											qty: 1,
											// @ts-ignore
											color: product?.quantityDetails?.color,
											// @ts-ignore
											size: product?.quantityDetails?.size,
										},
										'increase'
									)
								}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Right section */}
			<div className='flex flex-row md:flex-col justify-between md:items-end w-full md:w-auto gap-3 md:gap-5'>
				<p className='text-md font-semibold text-purple-950 dark:text-white'>
					TK. {totalQty * product?.salePrice!}{' '}
					<span className='text-gray-600 text-sm'>
						({totalQty + ' × ' + product?.salePrice})
					</span>
				</p>
				<Button
					type='button'
					variant='ghost'
					className='!text-red-500 underline cursor-pointer'
					onClick={() =>
						handleRemoveFromCart(product, setCartList, {
							// @ts-ignore
							color: product?.quantityDetails?.color,
							// @ts-ignore
							size: product?.quantityDetails?.size,
						})
					}
				>
					Remove
				</Button>
			</div>
		</div>
	);
};

export default CartItem;

const QtyButton: FC<{ type: string; onClick: CallableFunction }> = ({
	type,
	onClick,
}) => {
	const Icon = type === 'inc' ? Plus : Minus;
	return (
		<button
			type='button'
			onClick={() => onClick()}
			className='p-2 rounded-md bg-gray-100 dark:bg-transparent border hover:bg-purple-100 dark:hover:bg-purple-800 transition'
		>
			<Icon className='w-3 h-3' />
		</button>
	);
};
