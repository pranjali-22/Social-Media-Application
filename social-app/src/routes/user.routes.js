const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get('/:username', getProfile);
router.put('/me', auth, updateProfile);

module.exports = router;