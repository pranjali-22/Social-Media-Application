import { API_BASE_URL } from './apiURL.js';
const NOTIF_URL = `${API_BASE_URL}/api/v1/notifications`;

export async function getNotifications(token) {
    const response = await fetch(`${NOTIF_URL}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch notifications' };
    return data;
}

export async function markRead(token, id) {
    const response = await fetch(`${NOTIF_URL}/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to mark as read' };
    return data;
}

export async function markAllRead(token) {
    const response = await fetch(`${NOTIF_URL}/read-all`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to mark all read' };
    return data;
}

export async function getUnreadCount(token) {
    const response = await fetch(`${NOTIF_URL}/unread-count`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch count' };
    return data;
}