const express = require('express');
const router = express.Router();
const { getHomeFeed, getExploreFeed } = require('../controllers/feed.controller');
const auth = require('../middlewares/auth');


router.get('/home', auth, getHomeFeed);
router.get('/explore', getExploreFeed);


module.exports = router;