import gql from 'graphql-tag'

const ABOUT_QUERY = gql`
  query About {
		pageMetadata(where: {page: "About"}) {
			metaTitle
			metaDescription
			metaImage {
				url
			}
		}
		aboutModules(orderBy: order_ASC) {
			image {
				url
			}
			link
			text
		}
	}
`

export default ABOUT_QUERY
