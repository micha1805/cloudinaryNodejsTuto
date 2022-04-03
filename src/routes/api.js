const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const {CloudinaryStorage} = require("multer-storage-cloudinary");


//CLOUDINARY config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage })

// API's routes
router.get('/fakejson', (req, res) => {
	res.json({msg: "hello"})
})


router.post("/testupload", upload.single("image"), async (req, res) => {
	console.log("I'm in")
  return res.json({ picture: req.file.path });
});



router.post("/new", async (req, res) => {
  console.log(JSON.stringify(req.headers.accept))

  try{
    // const fileStr = req.files.image;
    // const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});
    // console.log(uploadResponse);
    // const url = uploadResponse.url



    // const newPost = new Post({
    //   title : req.body.title,
    //   post_content: req.body.post_content,
    //   url: url
    // })
    // await newPost.save()
    // await Profile.findOneAndUpdate({_id: req.user.profile._id }, {$push: {posts: newPost._id}})
    res.redirect('/')
  }catch(err){
    console.log(err)
    res.redirect("/")
  }

})











module.exports  = router;
