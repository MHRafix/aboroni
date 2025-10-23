import { Product } from '@/gql/graphql';
import toast from 'react-hot-toast';

// export const handleAddToCart = (
// 	product: Product,
// 	setCartList: CallableFunction,
// 	quantityDetail?: { qty?: number; color?: string; size?: string }
// ) => {
// 	// Default values if not provided
// 	const newDetail = {
// 		qty: quantityDetail?.qty ?? 1,
// 		color: quantityDetail?.color ?? '',
// 		size: quantityDetail?.size ?? '',
// 	};

// 	// Get existing cart
// 	const storedCart = localStorage.getItem('cartItems');
// 	let cart: any[] = storedCart ? JSON.parse(storedCart) : [];

// 	// Find if product with same id, color, and size exists
// 	const existingIndex = cart.findIndex(
// 		(item) =>
// 			item._id === product._id &&
// 			item.quantityDetails?.color === newDetail.color &&
// 			item.quantityDetails?.size === newDetail.size
// 	);

// 	if (existingIndex >= 0) {
// 		// Same product + same variant → increase qty
// 		cart[existingIndex].quantityDetails.qty += newDetail.qty;
// 	} else {
// 		// New variant (or new product) → push new entry
// 		cart.push({
// 			...product,
// 			quantityDetails: newDetail,
// 		});
// 	}

// 	// Save updated cart
// 	localStorage.setItem('cartItems', JSON.stringify(cart));

// 	// Update state
// 	setCartList({ productsInCart: cart, isPending: false });

// 	toast.success('Product added to cart');
// };

export const handleCart = (
	product: Product,
	setCartList: CallableFunction,
	quantityDetail?: { qty?: number; color?: string; size?: string },
	type: 'increase' | 'decrease' = 'increase'
) => {
	// Default values if not provided
	const newDetail = {
		qty: quantityDetail?.qty ?? 1,
		color: quantityDetail?.color ?? '',
		size: quantityDetail?.size ?? '',
	};

	// Get existing cart
	const storedCart = localStorage.getItem('cartItems');
	let cart: any[] = storedCart ? JSON.parse(storedCart) : [];

	// Find if product with same id, color, and size exists
	const existingIndex = cart.findIndex(
		(item) =>
			item._id === product._id &&
			item.quantityDetails?.color === newDetail.color &&
			item.quantityDetails?.size === newDetail.size
	);

	if (existingIndex >= 0) {
		// Same product + same variant
		if (type === 'increase') {
			cart[existingIndex].quantityDetails.qty += newDetail.qty;
		} else if (type === 'decrease') {
			cart[existingIndex].quantityDetails.qty -= newDetail.qty;

			// Remove item if qty drops to 0 or below
			if (cart[existingIndex].quantityDetails.qty <= 0) {
				cart.splice(existingIndex, 1);
			}
		}
	} else {
		// Product not found → add only on increase
		if (type === 'increase') {
			cart.push({
				...product,
				quantityDetails: newDetail,
			});
		}
	}

	// Save updated cart
	localStorage.setItem('cartItems', JSON.stringify(cart));

	// Update state
	setCartList({ productsInCart: cart, isPending: false });

	toast.success(
		type === 'increase' ? 'Product added to cart' : 'Product updated'
	);
};

export const handleRemoveFromCart = (
	product: Product,
	setCartList: CallableFunction,
	variant: { color?: string; size?: string }
) => {
	// Get existing cart
	const storedCart = localStorage.getItem('cartItems');
	let cart: any[] = storedCart ? JSON.parse(storedCart) : [];

	// Find product with same id, color, and size
	const existingIndex = cart.findIndex(
		(item) =>
			item._id === product._id &&
			item.quantityDetails?.color === (variant.color ?? '') &&
			item.quantityDetails?.size === (variant.size ?? '')
	);

	if (existingIndex >= 0) {
		// Remove item completely
		cart.splice(existingIndex, 1);
	}

	// Save updated cart
	localStorage.setItem('cartItems', JSON.stringify(cart));

	// Update state
	setCartList({ productsInCart: cart, isPending: false });

	toast.success('Product removed from cart');
};
