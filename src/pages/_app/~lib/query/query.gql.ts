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
				category {
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

export const All_Product_Categories_Query = gql`
	query ProductCategories(
		$orgUid: String!
		$input: ProductCategoriesListQueryDto
	) {
		productCategories(orgUID: $orgUid, input: $input) {
			nodes {
				_id
				name
			}
		}
	}
`;
