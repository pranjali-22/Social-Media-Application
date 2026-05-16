const express = require('express');
const router = express.Router();
const { getNotifications, markRead, markAllRead, getUnreadCount} = require('../controllers/notification.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, getNotifications);
router.put('/:id/read', auth, markRead);
router.put('/read-all', auth, markAllRead);
router.get('/unread-count', auth, getUnreadCount);


module.exports = router;