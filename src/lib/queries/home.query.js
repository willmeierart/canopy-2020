import gql from 'graphql-tag'

const HOME_QUERY = gql`
  query Home {
		homepageSliders {
			url
		}
	}
`

export default HOME_QUERY
