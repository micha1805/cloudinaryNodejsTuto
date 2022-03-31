require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// const cloudinary = require("cloudinary");
// const multer = require('multer')
// const {CloudinaryStorage} = require("multer-storage-cloudinary");
// const fileupload = require('express-fileupload')

//mongoose
mongoose.connect(process.env.MONGOOSE_URL,{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));


//CLOUDINARY

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY
//   });


//EJS
app.set('view engine','ejs');

// app.use(fileupload({useTempFiles: true}))
app.use("/static", express.static("public"));



//Routes
app.use('/', (req, res) => {
	res.render('home')
})



app.listen(3000);
