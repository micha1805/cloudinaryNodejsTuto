app = require('./app')

// declare and assign port
const port = process.env.PORT

// Launch server :
app.listen(port, () => {
	console.log('Server is up and running on Port ' + port)
})
