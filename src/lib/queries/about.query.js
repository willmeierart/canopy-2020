import gql from 'graphql-tag'

const ABOUT_QUERY = gql`
  query About {
		aboutModules(orderBy: order_ASC) {
			order
			text
			link
		}
	}
`

export default ABOUT_QUERY
