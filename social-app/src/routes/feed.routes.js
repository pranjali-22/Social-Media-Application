const express = require('express');
const router = express.Router();
const { getHomeFeed } = require('../controllers/feed.controller');

router.get('/home', getHomeFeed);

module.exports = router;