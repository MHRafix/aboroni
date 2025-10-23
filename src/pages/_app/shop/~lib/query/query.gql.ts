import { gql } from '@/lib/api-client';

export const Product_Details_Query = gql`
	query Product($id: String!, $orgUid: String!) {
		product(_id: $id, orgUID: $orgUid) {
			_id
			title
			thumbnail {
				bucket
				region
				key
				externalUrl
			}

			carouselImages {
				bucket
				region
				key
				externalUrl
			}
			gallery {
				bucket
				region
				key
				externalUrl
			}
			code
			model
			salePrice
			regularPrice
			discountAmount
			category {
				_id
				name
			}
			brand {
				_id
				name
			}
			unit {
				_id
				name
				unitCode
			}
			shortDescription
			description
			sizes {
				size
				description
			}
			colors {
				color
				description
			}
		}
	}
`;
