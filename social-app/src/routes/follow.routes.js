const express = require('express');
const router = express.Router();
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/follow.controller');
const auth = require('../middlewares/auth');

router.post('/:userId', auth, followUser);
router.delete('/:userId', auth, unfollowUser);
router.get('/:username/followers', getFollowers);
router.get('/:username/following', getFollowing);

module.exports = router;