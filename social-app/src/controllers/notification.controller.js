const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.sub })
            .populate('actor', 'username')
            .sort({ createdAt: -1 })
            .limit(20);

        res.json({ success: true, data: notifications });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};

exports.markRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
        res.json({ success: true, message: 'Marked as read' });
    } catch (err) {
        res.status(500).json({ success: false, error: { message: err.message } });
    }
};