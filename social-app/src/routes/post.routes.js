const express = require('express');
const router = express.Router();
const { createPost, getPost, deletePost, getUserPosts } = require('../controllers/post.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, createPost);
router.get('/:id', getPost);
router.delete('/:id', auth, deletePost);
router.get('/user/:username', getUserPosts);

module.exports = router;