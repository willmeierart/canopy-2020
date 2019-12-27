import gql from 'graphql-tag'

const PORTFOLIO_QUERY = ({ first, skip, type }) => type
	? gql`
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
				where: {type: ${type}}
			) {
				slug
				text
				thumbnail
				url
			}
		}
	`
	: gql`
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
