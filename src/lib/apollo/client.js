import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

const GRAPHQL_ENDPOINT = 'https://api-uswest.graphcms.com/v1/ck2ussn5u0p1w01fd8x2j69w3/master'

const link = createHttpLink({
	fetch,
	uri: GRAPHQL_ENDPOINT
})

export default withApollo(({ initialState }) =>
	new ApolloClient({
		link,
		cache: new InMemoryCache().restore(initialState || {})
	})
)
