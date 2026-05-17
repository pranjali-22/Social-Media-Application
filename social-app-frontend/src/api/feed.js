import { API_BASE_URL } from './apiUrl.js';
const FEED_URL = `${API_BASE_URL}/api/v1/feed`;

export async function getHomeFeed(token) {
    const response = await fetch(`${FEED_URL}/home`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch feed' };
    return data;
}

export async function getExploreFeed() {
    const response = await fetch(`${FEED_URL}/explore`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch explore' };
    return data;
}