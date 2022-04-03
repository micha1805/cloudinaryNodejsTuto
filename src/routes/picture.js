const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary')
const fileupload = require('express-fileupload')
const Picture = require("../models/picture").Picture

// cloudinary and fileupload config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY
});


// use express-fileupload middleware to easily have acces to
// the uploaded file. This middleware adds a 'files' entry to the request object
// All the files data are now in `req.files`
router.use(fileupload({useTempFiles: true}))


// pictures routes
router.post("/upload", async (req, res) => {

	console.log('body : ', req.body)

	try{

		// `req.files` exists thanks to the express-fileupload middleware :
		const fileStr = req.files.image;

		const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath,{});

		const newPicture = new Picture({
			title : "Hardcoded title",
			url: uploadResponse.url
		})
		await newPicture.save()
		res.redirect('/')
	}catch(err){
		console.log("ERROR : ", err)
		res.redirect("/")
	}

});


module.exports  = router;
