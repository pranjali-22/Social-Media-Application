const express = require('express');
const router = express.Router();
const { getHomeFeed, getExploreFeed } = require('../controllers/feed.controller');

router.get('/home', getHomeFeed);
router.get('/explore', getExploreFeed);


module.exports = router;