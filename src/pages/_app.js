import '@babel/polyfill'
import App, { Container } from 'next/app'
import Layout from 'layout/Layout'
import withData from 'lib/apollo/client'

class Application extends App {
	static async getInitialProps ({ Component, ctx }) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps({ ...ctx })
			: {}

		return { pageProps }
	}

	render () {
		const {
			Component,
			pageProps,
			router,
		} = this.props

		return (
			<Container>
				<Layout router={router}>
					<Component {...pageProps} router={router} />
				</Layout>
				<style jsx global>{`
					body {
						box-sizing: border-box;
						font-size: 1.3rem;
						height: 100vh;
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
			</Container>
		)
	}
}

export default withData(Application)
