import Link from 'next/link'
import { routes } from 'lib/routes'

const Header = () => {
	const { ABOUT, HOME, PORTFOLIO } = routes

	return (
		<header>
			<Link href={HOME.path}>
				<img alt="logo" src="/static/images/logo.png" />
			</Link>
			<div>
				{[PORTFOLIO, ABOUT].map((route, i) => <Link key={`link-${i}`} href={route.path}><span>{route.title}</span></Link>)}
			</div>
			<style jsx>{`
				header {
					align-items: flex-end;
					display: flex;
					justify-content: space-between;
					padding: 10px;
					padding-top: 30px;
				}
				img {
					cursor: pointer;
					max-height: 1.25rem;
				}
				img:hover {
					filter: brightness(175%);
					transition: filter .5s;
				}
				span {
					cursor: pointer;
					margin-left: 1rem;
					padding: 1px;
				}
				span:hover {
					background-color: var(--color-background-hover);
					color: var(--color-text-hover);
					transition: background-color .5s, color .5s;
				}
			`}</style>
		</header>
	)
}

export default Header
