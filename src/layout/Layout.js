import Header from './Header'

const Layout = ({ children, router }) => {
	return (
		<>
			<Header router={router} />
			<main>{children}</main>
		</>
	)
}

export default Layout
