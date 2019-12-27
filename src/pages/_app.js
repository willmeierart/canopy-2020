import '@babel/polyfill'
import App from 'next/app'
import Layout from 'layout/Layout'
import withData from 'lib/apollo/client'
import { ApolloProvider } from '@apollo/react-hooks';

class Application extends App {
	static async getInitialProps ({ Component, ctx }) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps({ ...ctx })
			: {}

		return { pageProps }
	}

	render () {
		const {
			apollo,
			Component,
			pageProps,
			router,
		} = this.props

		return (
			<ApolloProvider client={apollo}>
				<Layout router={router}>
					<Component {...pageProps} router={router} />
					<style jsx global>{`
						@font-face {
							font-family: 'pixelmix';
							src: url('/static/fonts/pixelmix-bold.woff2') format('woff2'), url('/static/fonts/pixelmix-bold.woff') format('woff');
							font-weight: bold;
							font-style: normal;
						}
						@font-face {
							font-family: 'pixelmix';
							src: url('/static/fonts/pixelmix.woff2') format('woff2'), url('/static/fonts/pixelmix.woff') format('woff');
							font-weight: normal;
							font-style: normal;
						}
						body {
							--color-grey-darkest: #676767;
							--color-grey-dark: #696964;
							--color-grey: #a5a5a2;
							--color-grey-light: #c9c9c7;
							--color-grey-lighter: #dfdfdd;
							--color-grey-lightest: #f2f2f2;
							--color-background: var(--color-grey-lightest);
							--color-text: var(--color-grey-darkest);
							--color-text-hover: #ffffff;
							--color-background-hover: var(--color-grey-darkest);
							background: var(--color-background);
							box-sizing: border-box;
							color: var(--color-text);
							font-family: 'pixelmix', sans-serif;
							font-size: 10px;
							height: 100vh;
							margin: 0;
							padding: 0;
							width: 100vw;
						}
						a {
							color: inherit;
							text-decoration: none;
						}
						li {
							list-style: none;
						}
					`}</style>
				</Layout>
			</ApolloProvider>
		)
	}
}

export default withData(Application)
