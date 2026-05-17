'use client';
import { useEffect, useState } from 'react';
import { getNotifications, markAllRead } from '../../api/notifications';
import useAuthStore from '../../store/authStore';
import Navbar from '../../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
    const { token } = useAuthStore();
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) { router.push('/login'); return; }
        getNotifications(token).then((res) => {
            if (!res.error) setNotifications(res.data);
            setLoading(false);
        });
    }, [token]);

    const handleMarkAll = async () => {
        await markAllRead(token);
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        toast.success('All marked as read');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster />
            <Navbar />
            <div className="max-w-xl mx-auto pt-20 pb-10 px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Notifications</h2>
                    <button onClick={handleMarkAll} className="text-sm text-gray-500 hover:text-black">Mark all read</button>
                </div>
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : notifications.length === 0 ? (
                    <p className="text-center text-gray-400">No notifications yet.</p>
                ) : (
                    notifications.map((n) => (
                        <div key={n._id} className={`bg-white rounded-xl shadow p-4 mb-3 ${!n.isRead ? 'border-l-4 border-black' : ''}`}>
                            <p className="text-sm">
                                <span className="font-semibold">@{n.actor?.username}</span>{' '}
                                {n.type === 'like' && 'liked your post'}
                                {n.type === 'comment' && 'commented on your post'}
                                {n.type === 'follow' && 'started following you'}
                                {n.type === 'reply' && 'replied to your comment'}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}