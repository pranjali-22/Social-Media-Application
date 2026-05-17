import { API_BASE_URL } from './apiUrl.js';
const USER_URL = `${API_BASE_URL}/api/v1/users`;

export async function getProfile(username) {
    const response = await fetch(`${USER_URL}/${username}`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch profile' };
    return data;
}

export async function updateProfile(token, profileData) {
    const response = await fetch(`${USER_URL}/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileData)
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to update profile' };
    return data;
}