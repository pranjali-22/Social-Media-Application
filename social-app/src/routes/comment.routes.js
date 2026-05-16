const express = require('express')
const router = express.Router();
const {addComment} = require('../controllers/comment.controller')

router.post('./:postId',addComment);


module.exports = router;



