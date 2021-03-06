import '@babel/polyfill'
import App from 'next/app'
import Head from 'next/head'
import withData from 'lib/apollo/client'
import { ApolloProvider } from '@apollo/react-hooks';
import { PageTransition } from 'next-page-transitions'
import Layout from 'layout/Layout'

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
					<Head>
						<meta property="og:type" content="website" />
						<meta property="og:site_name" content="canopy" />
						<meta property="og:locale" content="en_US" />
						<meta name="twitter:card" content="summary" />
						<meta name="theme-color" content="#676767" />
						<link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
						<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
						<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
						<link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
						<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
						<link rel="manifest" href="/static/site.webmanifest" />
					</Head>
					<PageTransition
						skipInititalTransition
						timeout={300}
						classNames="page-transition"
					>
						<Component
							{...pageProps}
							key={router.route + (router.query.page || '')}
							router={router}
						/>
					</PageTransition>
					<style jsx global>{`
						@font-face {
							font-family: 'Montserrat';
							src: url('/static/fonts/Montserrat-Regular.woff2') format('woff2'),
								url('/static/fonts/Montserrat-Regular.woff') format('woff');
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
							--color-background-hover-active: var(--color-grey);
							background: var(--color-background);
							box-sizing: border-box;
							color: var(--color-text);
							font-family: 'Montserrat', sans-serif;
							font-size: 11px;
							height: 100vh;
							letter-spacing: 1px;
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
						.page-transition-enter {
							opacity: 0;
						}
						.page-transition-enter-active {
							opacity: 1;
							transition: opacity 300ms;
						}
						.page-transition-exit {
							opacity: 1;
						}
						.page-transition-exit-active {
							opacity: 0;
							transition: opacity 300ms;
						}
					`}</style>
				</Layout>
			</ApolloProvider>
		)
	}
}

export default withData(Application)
