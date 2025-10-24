import { FormField } from '@/components/common/Form/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
	Billing,
	LineItem,
	OrderStatus,
	Payment,
	PaymentMethod,
	PaymentStatus,
	Product,
} from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { trackEvent } from '@/lib/fbPixel';
import { cartAtom } from '@/store/cart.atom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import CartItem from './~lib/components/CartItem';
import { Place_Order_Mutation } from './~lib/query/query.gql';

export const Route = createFileRoute('/_app/checkout/')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [, setCartList] = useAtom(cartAtom);

	// const [, setQuantity] = useState(1);
	const [cartList] = useAtom(cartAtom);

	const placeOrder = useMutation({
		mutationFn: async (payload: CreateOrderRequestPayloadType) => {
			const response = await gqlRequest({
				query: Place_Order_Mutation,
				variables: payload,
			});

			// fire tracking after mutation
			trackEvent('Purchase', {
				value: payload?.payload?.total,
				currency: 'BDT',
				content_ids: payload?.payload?.items?.map(
					(item: LineItem) => item?.productId
				),
				contents: payload?.payload?.items?.map((item: LineItem) => ({
					quantity: item?.quantity,
					item_price: item?.price,
					name: item?.product?.title,
					id: item?.productId,
				})),
			});

			return response; // ✅ return data to onSuccess
		},
		onSuccess(data: any) {
			console.log(data); // now you'll see GraphQL response
			localStorage.removeItem('cartItems');
			setCartList({ productsInCart: null, isPending: false });
			navigate({ to: `/order-success?orderId=${data?.placeOrder?._id}` });
		},
	});

	const form = useForm({ resolver: yupResolver(Form_Schema) });

	const subTotal = cartList?.productsInCart?.reduce(
		(total: number, product: any) => {
			const detail = product.quantityDetails;
			const productTotal = (detail?.qty ?? 0) * (product.salePrice ?? 0);
			return total + productTotal;
		},
		0
	);

	const deliveryFee = form.watch('district') === 'ঢাকা' ? 70 : 120;

	const handleOnSubmit = (values: FormValueType) => {
		const payload = {
			payload: {
				items: cartList?.productsInCart?.map((item: Product) => ({
					productId: item?._id,
					product: {
						title: item?.title,
						code: item?.code,
						model: item?.model,
						orgUID: import.meta.env.VITE_APP_ORGANIZATION_UID,
						regularPrice: item?.regularPrice,
						salePrice: item?.salePrice,
						thumbnail: item?.thumbnail,
					},
					price: item?.salePrice,
					// @ts-ignore
					quantity: item?.quantityDetails.qty,
					// @ts-ignore
					color: item?.quantityDetails.color,
					// @ts-ignore
					size: item?.quantityDetails.size,
					// @ts-ignore
					subtotal: item?.quantityDetails.qty * item?.salePrice!,
				})),
				status: OrderStatus.Pending,
				billing: values,
				total: subTotal + deliveryFee,
				deliveryFee,
				payment: {
					amount: subTotal + deliveryFee,
					method: PaymentMethod.CashOnDelivery,
					status: PaymentStatus.Due,
				},
				orgUID: import.meta.env.VITE_APP_ORGANIZATION_UID,
			},
		};
		placeOrder.mutate(payload);
	};

	return (
		<div className='py-0 px-4 '>
			{' '}
			<br />
			<br /> <br />
			<div className='relative !my-20 max-w-7xl mx-auto  border border-gray-200 dark:border-purple-950 rounded-lg shadow p-6'>
				<h2 className='text-center font-semibold text-xl mb-6 pb-2 border-b-4 border-dashed border-gray-200 text-purple-950 dark:text-white'>
					অর্ডার করতে সঠিক তথ্য দিয়ে নিচের ফরম পূরণ করুন
				</h2>
				{/* <pre>{JSON.stringify(cartList, null, 2)}</pre> */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleOnSubmit)}
						className='grid grid-cols-1 md:grid-cols-2 gap-6'
					>
						{/* Billing Details */}
						<div className='space-y-4'>
							<h3 className='font-semibold text-purple-950 dark:text-white border-b pb-1'>
								বিলিং ডিটেইলস
							</h3>

							<FormField
								label='আপনার নাম লিখুন *'
								placeholder='সম্পূর্ণ নামটি লিখুন'
								control={form.control}
								{...form.register('name')}
							/>
							<FormField
								label='আপনার মোবাইল নাম্বারটি লিখুন *'
								placeholder='১১ ডিজিটের মোবাইল নাম্বারটি লিখুন'
								control={form.control}
								{...form.register('phone')}
							/>
							<FormField
								label='আপনার ইমেইল লিখুন (অপশনাল)'
								placeholder='ইমেইলটি লিখুন'
								control={form.control}
								{...form.register('email')}
							/>
							<div>
								<label className='block text-sm mb-1 text-purple-950 dark:text-gray-300'>
									আপনার জেলা সিলেক্ট করুন *
								</label>
								<select
									{...form.register('district')}
									className='w-full border rounded-md px-3 py-3 text-sm bg-white dark:bg-transparent text-purple-950 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500'
								>
									{districts?.map((dis) => (
										<option key={dis}>{dis}</option>
									))}
								</select>
								{form.formState.errors.district && (
									<span className='text-sm text-red-500 mt-1 block'>
										{form.formState.errors.district.message}
									</span>
								)}
							</div>
							<FormField
								control={form.control}
								label='সম্পূর্ণ ঠিকানা * (রোড নাম/নম্বর, বাড়ি নাম/নম্বর, স্ট্রীট নাম্বার)'
								placeholder='রোড নাম/নম্বর, বাড়ি নাম/নম্বর, স্ট্রীট নাম্বার'
								as='textarea'
								{...form.register('address')}
							/>
						</div>

						{/* Product Details */}
						<div className='border dark:border-gray-700 rounded-lg p-4 space-y-4'>
							<h3 className='font-semibold border-b-2 border-dashed border-gray-300 pb-1 text-purple-950 dark:text-white'>
								প্রোডাক্ট ডিটেইলস
							</h3>

							{cartList?.productsInCart?.map((product: any, idx: number) => (
								<CartItem key={idx} product={product} />
							))}

							{/* Totals */}
							<div className='space-y-1 text-sm text-purple-950 dark:text-gray-200'>
								<Row label='সাব-টোটাল (+)' value={`TK. ${subTotal}`} />
								{form.watch('district') === 'ঢাকা' ? (
									<Row
										label='ডেলিভারি চার্জ (+)'
										value='ঢাকা সিটির ভিতরে TK. 70'
										highlight
									/>
								) : (
									<Row
										label='ডেলিভারি চার্জ (+)'
										value='ঢাকার বাহিরে TK. 120'
										highlight
									/>
								)}
								<Row
									label='টোটাল'
									value={`TK. ${subTotal + deliveryFee}`}
									bold
									divider
								/>
							</div>

							{/* Payment */}
							<div className='grid md:flex gap-5'>
								<div className='flex items-center gap-2 pt-3 text-purple-950 dark:text-white'>
									<input type='radio' checked readOnly />
									<span className='text-md font-medium'>Cash on delivery</span>
									<span className='text-md font-medium bg-red-100 dark:bg-red-900 px-2 py-0.5 rounded-md'>
										COD
									</span>
								</div>
								{/* <div className='flex items-center gap-2 border-t dark:border-gray-700 pt-3 text-purple-950 dark:text-white'>
									<input type='radio' checked readOnly />
									<span className='text-sm'>Online Payment</span>
									<span className='text-xs bg-red-100 dark:bg-red-900 px-2 py-0.5 rounded-md'>
										SSL Commerze
									</span>
								</div> */}
							</div>

							{/* Delivery Info */}
							<p className='text-md border text-purple-950 font-medium dark:text-gray-400 bg-gray-100 dark:bg-transparent p-2 py-3 rounded-md'>
								১-৩ দিনের মধ্যে হোম ডেলিভারি করা হবে। এর মধ্যে কল দেয়া হবে না
							</p>

							{/* Promo Code */}
							{/* <div className='grid md:flex gap-2'>
								<input
									type='text'
									placeholder='If you have a Promo Code, Enter Here...'
									className='flex-1 border rounded-md px-3 py-3 text-sm bg-white dark:bg-transparent text-purple-950 dark:text-white border-purple-950 focus:ring-2 focus:ring-purple-950 outline-0'
								/>
								<Button
									type='button'
									className='bg-purple-950 py-6 hover:bg-purple-900 text-white cursor-pointer px-4 rounded-md text-sm'
								>
									Apply
								</Button>
							</div> */}

							{/* Order Button */}
							<Button
								type='submit'
								className='w-full bg-purple-950 hover:bg-purple-900 text-white py-6 cursor-pointer rounded-md font-semibold'
								disabled={
									placeOrder.isPending || !cartList?.productsInCart?.length
								}
							>
								অর্ডারটি কনফার্ম করুন TK. {subTotal + deliveryFee || 0.0}
							</Button>
						</div>
					</form>
				</Form>
				{placeOrder.isPending && (
					<div
						id='overlay'
						className='absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'
					>
						<span role='status' className='flex items-center gap-3'>
							<svg
								className='animate-spin h-8 w-8 border-4 border-t-transparent rounded-full'
								viewBox='0 0 24 24'
								aria-hidden='true'
							>
								<circle
									cx='12'
									cy='12'
									r='10'
									stroke='currentColor'
									stroke-width='4'
									fill='none'
									className='opacity-25'
								></circle>
								<path
									d='M22 12a10 10 0 0 1-10 10'
									className='opacity-75'
									stroke='currentColor'
									stroke-width='4'
									stroke-linecap='round'
									fill='none'
								></path>
							</svg>
							<span className='sr-only'>Loading...</span>
						</span>
					</div>
				)}
			</div>
		</div>
	);
}

const Row = ({
	label,
	value,
	bold,
	divider,
	highlight,
}: {
	label: string;
	value: string;
	bold?: boolean;
	divider?: boolean;
	highlight?: boolean;
}) => (
	<div
		className={`flex justify-between ${
			divider ? 'border-t dark:border-gray-700 pt-2' : ''
		} ${bold ? 'font-semibold' : ''}`}
	>
		<span>{label}</span>
		<span className={`font-bold ${highlight ? 'text-red-500' : ''}`}>
			{value}
		</span>
	</div>
);

/* ----------------- Yup Schema ----------------- */
const Form_Schema = Yup.object().shape({
	name: Yup.string().required('নাম লিখুন'),
	phone: Yup.string().required('ফোন নাম্বার লিখুন'),
	email: Yup.string()
		.email('ইমেইল সঠিক নয়')
		.optional()
		.nullable()
		.label('ইমেইল লিখুন'),
	district: Yup.string().required('জেলা সিলেক্ট করুন'),
	address: Yup.string().required('ঠিকানা লিখুন'),
});

type FormValueType = Yup.InferType<typeof Form_Schema>;

interface OrderPayload {
	items: LineItem[];
	status: OrderStatus;
	billing: Billing; // or replace with a proper BillingDetails type
	total: number;
	deliveryFee: number;
	payment: Payment;
	orgUID: string;
}
interface CreateOrderRequestPayloadType {
	payload: OrderPayload;
}
const districts = [
	'ঢাকা',
	'গাজীপুর',
	'নারায়ণগঞ্জ',
	'নরসিংদী',
	'মানিকগঞ্জ',
	'মুন্সীগঞ্জ',
	'ফরিদপুর',
	'গোপালগঞ্জ',
	'মাদারীপুর',
	'রাজবাড়ী',
	'শরীয়তপুর',
	'কিশোরগঞ্জ',
	'ময়মনসিংহ',
	'জামালপুর',
	'নেত্রকোণা',
	'শেরপুর',
	'চট্টগ্রাম',
	'কক্সবাজার',
	'ফেনী',
	'নোয়াখালী',
	'লক্ষ্মীপুর',
	'চাঁদপুর',
	'কুমিল্লা',
	'ব্রাহ্মণবাড়িয়া',
	'রাঙ্গামাটি',
	'খাগড়াছড়ি',
	'বান্দরবান',
	'সিলেট',
	'মৌলভীবাজার',
	'হবিগঞ্জ',
	'সুনামগঞ্জ',
	'খুলনা',
	'বাগেরহাট',
	'সাতক্ষীরা',
	'যশোর',
	'নড়াইল',
	'মাগুরা',
	'ঝিনাইদহ',
	'কুষ্টিয়া',
	'চুয়াডাঙ্গা',
	'মেহেরপুর',
	'বরিশাল',
	'পিরোজপুর',
	'ঝালকাঠি',
	'ভোলা',
	'পটুয়াখালী',
	'বরগুনা',
	'রাজশাহী',
	'নাটোর',
	'নওগাঁ',
	'চাঁপাইনবাবগঞ্জ',
	'পাবনা',
	'সিরাজগঞ্জ',
	'বগুড়া',
	'জয়পুরহাট',
	'রংপুর',
	'গাইবান্ধা',
	'কুড়িগ্রাম',
	'লালমনিরহাট',
	'নীলফামারী',
	'দিনাজপুর',
	'ঠাকুরগাঁও',
	'পঞ্চগড়',
];
