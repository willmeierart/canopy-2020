import Head from 'next/head'

export const defaultDescription = 'a creative studio';
export const defaultImage = '/static/images/logo.png';
export const defaultTitle = 'canopy';

const PageHead = ({ metadata }) => {
	const description = metadata?.metaDescription || defaultDescription
	const image = metadata?.metaImage?.url || defaultImage
	const title = metadata?.metaTitle || defaultTitle
	return (
		<Head>
			<title key="bsrc-title">{title}</title>
			<meta key="og:title" property="og:title" content={title} />
			<meta key="og:description" property="og:description" content={description} />
			<meta key="og:image" property="og:image" content={image} />
			<meta key="twitter:description" name="twitter:description" content={description} />
			<meta key="twitter:title" name="twitter:title" content={title} />
			<meta key="twitter:image" name="twitter:image" content={image} />
		</Head>
	)
}

export default PageHead
