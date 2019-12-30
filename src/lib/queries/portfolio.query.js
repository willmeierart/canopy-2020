import gql from 'graphql-tag'

const PORTFOLIO_QUERY = ({ first, skip } = { first: 100, skip: 0 }) => gql`
	query Portfolio {
		portfolioModulesConnection {
			aggregate {
				count
			}
		}
		portfolioModules(
			first: ${first}
			orderBy: createdAt_DESC
			skip: ${skip}
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
