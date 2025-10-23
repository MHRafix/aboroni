import { gql } from '@/lib/api-client';

export const Place_Order_Mutation = gql`
	mutation PlaceOrder($payload: CreateOrderInput!) {
		placeOrder(payload: $payload) {
			_id
		}
	}
`;
