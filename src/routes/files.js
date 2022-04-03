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





// API's routes
router.get('/fakejson', (req, res) => {
	res.json({msg: "hello"})
})


router.post("/testupload", async (req, res) => {
	// console.log("I'm in")
	// console.log(req.files)
	// // try {
	// // 	console.log(req.files.image)
	// // } catch(err){
	// // 	console.log(error)
	// // }
 //  // return res.json({ picture: req.file.path });


 //  return res.json({ message: "NOOOO" });


 // console.log(req.body)

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



router.post("/new", async (req, res) => {
  console.log(req.body)

  try{
    const fileStr = req.files.image;
    const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});
    console.log(uploadResponse);
    const url = uploadResponse.url
    const newPost = new Post({
      title : req.body.title,
      post_content: req.body.post_content,
      url: url
    })
    await newPost.save()
    await Profile.findOneAndUpdate({_id: req.user.profile._id }, {$push: {posts: newPost._id}})
    res.redirect('/dashboard')
  }catch(err){
    console.log(err)
    res.redirect("/dashboard")
  }

})







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
