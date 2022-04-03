const mongoose = require('mongoose')
// no options are passed except db URL :
mongoose.connect(process.env.MONGOOSE_URL, error => {
	if(error) throw error;
	console.log('connected to MongoDB')
});
