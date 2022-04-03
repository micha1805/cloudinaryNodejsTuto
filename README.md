# Cloudinary in an Express.js application ( with MongoDB Atlas database)


Instead of storing images directly into your database, it's a better practice to store urls pointing to them.

But where to store them?

Cloudinary is a good answer to that question, it gives you the opportunity to easily store images on their servers and making them available with simple urls. The free version is enough for what we need.

https://cloudinary.com/documentation


There is a lot of support for different languages, for Node.js here it is :

https://www.npmjs.com/package/cloudinary

And its Github repo:

https://github.com/cloudinary/cloudinary_npm



Obviously you need to create an account. Once it's done you will need some credentials to connect it to your app.

We need 3 infos, they are in your Cloudinary Dashboard :

![credentials needed](cloudinaryCredentials.png)



## Setup

(The sample app uses mongodb Atlas. I won't explain it's configuration.)

Let's say you already have an Expres.js application running. If you want to use Cloudinary you need to install the following packages :

```bash
npm i cloudinary express-fileupload
```

The first one is obviously the npm Cloudinary package, the second one is used to easily handle files upload.


We will send our image using a form, to do that we need to specify how the data will be encoded, we need it to be `multipart/form-data` :

```html

<form action="/my/Post/Url" method="POST" enctype="multipart/form-data">

```
Now in the backend, to use cloudinary, we first need to configure it, proceed the following using the values showed in the dashboard snapshot :

```js

const cloudinary = require('cloudinary')

cloudinary.config({
	cloud_name: "cloudinaryCredentialValue1",
	api_key: "cloudinaryCredentialValue2",
	api_secret: "cloudinaryCredentialValue3"
});


```

Be cautious while using them, they should be environment variables. I do it in the sample app, explained further down.

Before writing the route's behaviour we need to tell Express.js that we want to use the `express-fileupload` middleware to make things easy for us :

```js
const router = express.Router();

router.use(fileupload({useTempFiles: true}))
```

The option `useTempFiles` is just used to store locally every file sent in a `tmp` folder, you can set is to `false` but it's useful to verify if something is working in the meantime.

This middleware will add a `files` property to the request object containing everything we need to handle the file.

Now that the middleware is in place we can use it. Let's write the route to add an image to Cloudinary AND create a database element containing the Cloudinary url. In this example I use a model called `Picture`.

```js
// pictures routes
router.post("/my/Post/Url", async (req, res) => {

	try{

		// `req.files` exists thanks to the express-fileupload middleware :
		const fileStr = req.files.image || "https://picsum.photos/300/600";
		const title = req.body.title || ""

		// Here we upload the image to cloudinary :
		const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath,{});

		// We create a new instance of the Picture model
		const newPicture = new Picture({
			title : title,
			// the url inserted comes from cloudinary :
			url: uploadResponse.url
		})
		// We save it to our db :
		await newPicture.save()
		// when done let's go back to homepage:
		res.redirect('/')
	}catch(err){
		console.log("ERROR : ", err)
		res.redirect("/")
	}

});

```

That's it! You can now use Cloudinary to store images (indirectly) into your database.


## Comments on sample app, how to run it

You need a file called `dev.env` in the `config` folder, it must contains the following, obviously adapted to your own credentials :


```bash
PORT=3000
CLOUDINARY_NAME="blablabla"
CLOUDINARY_API_KEY="1234567890"
CLOUDINARY_SECRET_KEY="myVerySecretKey"
MONGOOSE_URL='mongodb+srv://myAtlasUsername:MYPASSWORD@someurl.mongodb.net/myDatabaseNAme?retryWrites=true&w=majority'

```

I use `env-cmd` and `dotenv`to be able to use environnement variables.

When this is done run the dev script :

```bash
npm run dev
```

It will launch the app with the environment variables and nodemon, check in `package.json` to see the exact command that is actually run :
```bash
env-cmd -f ./config/dev.env nodemon src/index.js
```









NEXT STEPS

store fileurl to db
display all images in the home page
some styling
separer cloudinary mongo dans un require
