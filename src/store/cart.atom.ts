import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

export interface IAuthStore {
	isPending?: boolean;
	productsInCart: any | null;
}
export const cartAtom = atomWithImmer({
	isPending: false,
	productsInCart: localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems')!)
		: null,
});
export async function fetchCart() {
	// const token = localStorage.getItem('token'); // or however you're storing it
	// try {
	// 	const decoded: User = jwtDecode(token!);
	// 	jotaiStore.set(userAtom, (draft) => {
	// 		draft.isPending = true;
	// 	});
	// 	try {
	// 		const data = await gqlRequest<{
	// 			products: Product[] | null;
	// 		}>({
	// 			query: Login_User_Details_Query,
	// 			variables: {
	// 				input: {
	// 					key: 'email',
	// 					operator: 'eq',
	// 					value: decoded?.email,
	// 				},
	// 			},
	// 		});
	// 		jotaiStore.set(userAtom, (draft) => {
	// 			draft.productsInCart = data?.products || null;
	// 		});
	// 		return data;
	// 	} catch {
	// 		jotaiStore.set(userAtom, (draft) => {
	// 			draft.productsInCart = null;
	// 		});
	// 	} finally {
	// 		jotaiStore.set(userAtom, (draft) => {
	// 			draft.isPending = false;
	// 		});
	// 	}
	// } catch (error) {
	// 	jotaiStore.set(userAtom, (draft) => {
	// 		draft.productsInCart = null;
	// 	});
	// }
}

export function useCart() {
	const [cart, setCart] = useAtom(cartAtom);
	return [cart, setCart] as const;
}
