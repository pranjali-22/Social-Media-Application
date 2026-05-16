const express = require('express')
const router = express.Router();
const {addComment, getComments, deleteComment, replyComment} = require('../controllers/comment.controller')
const auth = require('../middlewares/auth')

router.post('./:postId',addComment);
router.get('./:postId', getComments);
router.delete('/:commentId', deleteComment);
router.post('/:postId/reply/:parentId', replyComment);


module.exports = router;



