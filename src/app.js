require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const path = require('path');

// const {CloudinaryStorage} = require("multer-storage-cloudinary");
// const fileupload = require('express-fileupload')

//run mongoose :
require('./db/mongoose')



//We use ejs layout
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs');

// app.use(fileupload({useTempFiles: true}))
// we will serve the src/public folder as the /static folder:
app.use("/static", express.static("src/public"));



//Routes
app.use('/',require('./routes/pages'));
app.use('/api',require('./routes/api'));


module.exports = app
