import { API_BASE_URL } from './apiURL.js';
const FOLLOW_URL = `${API_BASE_URL}/api/v1/follow`;

export async function followUser(token, userId) {
    const response = await fetch(`${FOLLOW_URL}/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to follow' };
    return data;
}

export async function unfollowUser(token, userId) {
    const response = await fetch(`${FOLLOW_URL}/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to unfollow' };
    return data;
}

export async function getFollowers(username) {
    const response = await fetch(`${FOLLOW_URL}/${username}/followers`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch followers' };
    return data;
}

export async function getFollowing(username) {
    const response = await fetch(`${FOLLOW_URL}/${username}/following`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch following' };
    return data;
}