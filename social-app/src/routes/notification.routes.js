const express = require('express');
const router = express.Router();
const { getNotifications, markRead, markAllRead, getUnreadCount} = require('../controllers/notification.controller');

router.get('/', getNotifications);
router.put('/:id/read', markRead);
router.put('/read-all', markAllRead);
router.get('/unread-count', getUnreadCount);


module.exports = router;