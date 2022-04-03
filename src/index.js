// This file is the one opened by node when we run 'npm start'.
// It's a very simple file to keep everything clear and simple.
// The actual app is in the app.js file



// Get the app :
app = require('./app')

// declare and assign port, 3000 by default :
const port = process.env.PORT || 3000

// Launch server :
app.listen(port, () => {
	console.log(`[${new Date().toUTCString() }]\nServer is up and running on Port ${port}`)
})
