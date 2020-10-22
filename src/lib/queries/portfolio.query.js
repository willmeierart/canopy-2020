import gql from 'graphql-tag'

const PORTFOLIO_QUERY = ({ first = 100, skip = 0, type }) => gql`
	query Portfolio {
		pageMetadata(where: {page: "Portfolio"}) {
			metaTitle
			metaDescription
			metaImage {
				url
			}
		}
		portfolioModulesConnection${type ? '(where: {type: ' + type + '})' : ''} {
			aggregate {
				count
			}
		}
		portfolioModules(
			first: ${first}
			orderBy: order_ASC
			skip: ${skip}
			${type ? 'where: {type: ' + type + '}' : ''}
		) {
			slug
			text
			thumbnail {
				url
			}
			type
			url
		}
	}
`

export default PORTFOLIO_QUERY
