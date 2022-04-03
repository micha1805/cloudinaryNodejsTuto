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

router.use(fileupload({useTempFiles: true}))





// upload routes
router.post("/image", async (req, res) => {

	try{

		const fileStr = req.files.image;

		const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath,{});

		console.log(uploadResponse);

		const url = uploadResponse.url


		const newPicture = new Picture({
			title : "Hardcoded title",
			url: url
		})
		await newPicture.save()
		res.redirect('/')
	}catch(err){
		console.log("ERROR : ", err)
		res.redirect("/")
	}

});


module.exports  = router;
