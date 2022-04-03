require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const path = require('path');

//run mongoose :
require('./db/mongoose')

//We use ejs layout
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs');

// we will serve the src/public folder in the /static folder:
app.use("/static", express.static("src/public"));



//Routes
app.use('/',require('./routes/pages'));
app.use('/picture',require('./routes/picture'));



// export Express app :
module.exports = app
