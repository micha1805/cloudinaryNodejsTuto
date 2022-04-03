require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const path = require('path');

// const cloudinary = require("cloudinary");
// const multer = require('multer')
// const {CloudinaryStorage} = require("multer-storage-cloudinary");
// const fileupload = require('express-fileupload')

//mongoose
require('./db/mongoose')

//CLOUDINARY

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY
//   });


//EJS
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs');

// app.use(fileupload({useTempFiles: true}))
app.use("/static", express.static("src/public"));



//Routes
app.use('/', (req, res) => {
	res.render('home')
})


module.exports = app
