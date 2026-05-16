const express = require('express')
const router = express.Router();
const {addComment, getComments, deleteComment, replyComment} = require('../controllers/comment.controller')
const auth = require('../middlewares/auth')

router.post('./:postId',addComment);
router.get('./:postId', getComments);
router.delete('/:commentId', auth, deleteComment);
router.post('/:postId/reply/:parentId', auth, replyComment);


module.exports = router;



