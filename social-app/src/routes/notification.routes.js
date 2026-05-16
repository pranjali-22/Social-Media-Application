const express = require('express');
const router = express.Router();
const { getNotifications } = require('../controllers/notification.controller');

router.get('/', getNotifications);


module.exports = router;