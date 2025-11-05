import {
	Product,
	ProductCategory,
	ProductCategoryPagination,
	ProductPagination,
} from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { Product_Details_Query } from '@/pages/_app/shop/~lib/query/query.gql';
import {
	All_Product_Categories_Query,
	All_Products_Query,
} from '@/pages/_app/~lib/query/query.gql';
import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import { jotaiStore } from '.';

export interface IProductStore {
	isPending?: boolean;
	products: Product[];
	productsCategories: ProductCategory[];
	product: Product | null;
}
export const productAtom = atomWithImmer<IProductStore>({
	isPending: false,
	products: [],
	productsCategories: [],
	product: null,
});
export async function fetchProducts() {
	try {
		const data = await gqlRequest<{ products: ProductPagination | null }>({
			query: All_Products_Query,
			variables: {
				input: {
					page: 1,
					limit: 1000,
					sort: 'DESC',
					sortBy: 'createdAt',
				},
				orgUid: import.meta.env.VITE_APP_ORGANIZATION_UID,
			},
		});

		jotaiStore.set(productAtom, (draft) => {
			draft.isPending = false;
			draft.products = data?.products?.nodes as any;
		});

		return data;
	} catch {
		jotaiStore.set(productAtom, (draft) => {
			draft.products = [];
		});
	} finally {
		jotaiStore.set(productAtom, (draft) => {
			draft.isPending = false;
		});
	}
}
export async function fetchProductCategories() {
	try {
		const data = await gqlRequest<{
			productCategories: ProductCategoryPagination | null;
		}>({
			query: All_Product_Categories_Query,
			variables: {
				input: {
					page: 1,
					limit: 1000,
				},
				orgUid: import.meta.env.VITE_APP_ORGANIZATION_UID,
			},
		});

		jotaiStore.set(productAtom, (draft) => {
			draft.isPending = false;
			draft.productsCategories = data?.productCategories?.nodes as any;
		});

		return data;
	} catch {
		jotaiStore.set(productAtom, (draft) => {
			draft.productsCategories = [];
		});
	} finally {
		jotaiStore.set(productAtom, (draft) => {
			draft.isPending = false;
		});
	}
}
export async function fetchProduct(id: string) {
	try {
		const data = await gqlRequest<{ product: Product | null }>({
			query: Product_Details_Query,
			variables: {
				id,
				orgUid: import.meta.env.VITE_APP_ORGANIZATION_UID,
			},
		});

		jotaiStore.set(productAtom, (draft) => {
			draft.product = data?.product as Product;
		});

		return data;
	} catch {
		jotaiStore.set(productAtom, (draft) => {
			draft.product = null;
		});
	} finally {
		jotaiStore.set(productAtom, () => {
			// draft.isPending = false;
		});
	}
}

export function useProducts() {
	const [products, setProducts] = useAtom(productAtom);
	return [products, setProducts] as const;
}
