const nextJS = require('next')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const routes = require('./routes').routes

const dev = process.env.NODE_ENV !== 'production'

const app = nextJS({ dir: './src', dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
	const server = express()
	server.use(morgan('dev'))
	server.use(compression())

	Object.keys(routes).forEach(key => {
		const route = routes[key]
		server.get(route.path, (req, res) => {
			return app.render(req, res, `/${route.page}`, Object.assign({}, req.params, req.query))
		})
	})

	server.get('*', handle)

	const PORT = process.env.PORT || 3000
	server.listen(PORT, err => {
		if (err) throw err
		console.info(`> Ready on http://localhost:${PORT}`)
	})
})
