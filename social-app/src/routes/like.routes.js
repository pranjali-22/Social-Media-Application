const express = require('express');
const router = express.Router();
const { likeTarget, unlikeTarget, getLikes } = require('../controllers/like.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, likeTarget);
router.delete('/', auth, unlikeTarget);
router.get('/:targetId', getLikes);

module.exports = router;