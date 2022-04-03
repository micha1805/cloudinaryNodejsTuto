# Cloudinary in an Express.js application ( with MongoDB Atlas database)


Instead of storing files directly into your database, you can store references to these files instead. That is why we use services like Cloudinary.

Cloudinary is a free service giving the opportunity to store your images on their server.

A very easy and practical way of storing images in your database is to use an external service to store the image while in your actual database you only store the url to that image.

## Setup



CHANGER MULTER (deprecated) ) express-fileupload

Let's say you already have an Expres.js application running. If you want to use Cloudinary you need to install the following packages :

```bash
npm i cloudinary multer multer-storage-cloudinary
```


`multer` is needed to make the file upload easier, and `multer-cloudinary` is an extension dedicated to cloudinary.

do NOT forget v2 while requiring cloudinary, it will not work witj multer properly :

```js
const cloudinary = require('cloudinary').v2
````

In the form it is important to specifu you will use `multipart/form-data` :
```html

<form action="/my/Post/Url" method="POST" enctype="multipart/form-data">

```


## Comments on sample app, how to run it

You need a file called `dev.env` in the `config` folder, it must contains the following, obviously adapted to your credentials :


```bash
PORT=3000
CLOUDINARY_NAME="blablabla"
CLOUDINARY_API_KEY="1234567890"
CLOUDINARY_SECRET_KEY="myVerySecretKey"
MONGOOSE_URL='mongodb+srv://myAtlasUsername:MYPASSWORD@someurl.mongodb.net/myDatabaseNAme?retryWrites=true&w=majority'

```

I use `env-cmd` to be able to use environnement variables.

When this is done run the dev script :

```bash
npm run dev
```

It will launch the app with the environment variables and nodemon, check in `package.json` the exact command that is actually run :
```bash
env-cmd -f ./config/dev.env nodemon src/index.js
```












NEXT STEPS

store fileurl to db
display all images in the home page
some styling
separer cloudinary mongo dans un require
