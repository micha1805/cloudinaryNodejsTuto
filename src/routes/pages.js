const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home', {fakeImageUrl: "https://picsum.photos/300/600"})
})

module.exports  = router;
