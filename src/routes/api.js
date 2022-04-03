const express = require('express');
const router = express.Router();

router.get('/fakejson', (req, res) => {
	res.json({msg: "hello"})
})

module.exports  = router;
