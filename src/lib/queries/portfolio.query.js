import gql from 'graphql-tag'

const PORTFOLIO_QUERY = type => type
	? gql`
		query Portfolio {
			portfolioModules(where: {type: ${type}}}) {
				text
				thumbnail
				url
			}
		}
	`
	: gql`
		query Portfolio {
			portfolioModules {
				text
				thumbnail
				type
				url
			}
		}
	`

export default PORTFOLIO_QUERY
