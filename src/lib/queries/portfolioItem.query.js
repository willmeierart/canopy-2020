import gql from 'graphql-tag'

const PORTFOLIO_ITEM_QUERY = ({ slug }) => gql`
		query Portfolio {
			portfolioModule(where: {slug: "${slug}"}) {
				metaDescription
				metaImage: thumbnail {
					url
				}
				metaTitle
				url
			}
		}
	`

export default PORTFOLIO_ITEM_QUERY
