import { API_BASE_URL } from './apiURL.js';
const LIKES_URL = `${API_BASE_URL}/api/v1/likes`;

export async function likeTarget(token, targetId, targetType) {
    const response = await fetch(`${LIKES_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ targetId, targetType })
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to like' };
    return data;
}

export async function unlikeTarget(token, targetId, targetType) {
    const response = await fetch(`${LIKES_URL}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ targetId, targetType })
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to unlike' };
    return data;
}

export async function getLikes(targetId) {
    const response = await fetch(`${LIKES_URL}/${targetId}`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch likes' };
    return data;
}