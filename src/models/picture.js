const mongoose = require('mongoose');
const PictureSchema  = new mongoose.Schema({
  title :{
      type  : String,
      required : true
  },
  url: {
    type  : String,
    required : true
  },
  date :{
    type : Date,
    default : Date.now
  }
});

const Picture = mongoose.model('Picture',PictureSchema);

module.exports = {Picture, PictureSchema};

