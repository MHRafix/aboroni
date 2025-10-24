import { gql } from '@/lib/api-client';

export const All_Products_Query = gql`
	query Products($orgUid: String!, $input: ProductListQueryDto) {
		products(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				title
				model
				code
				shortDescription
				thumbnail {
					bucket
					region
					key
					externalUrl
				}
				brand {
					name
				}
				orgUID
				salePrice
				regularPrice
				createdAt
				updatedAt
			}
			meta {
				totalCount
				currentPage
				hasNextPage
				totalPages
			}
		}
	}
`;
