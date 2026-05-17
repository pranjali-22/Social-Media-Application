import { API_BASE_URL } from './apiURL.js';
const AUTH_URL = `${API_BASE_URL}/api/v1/auth`;

export async function registerUser(username, email, password) {
    const response = await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Registration failed' };
    return data;
}

export async function loginUser(email, password) {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Login failed' };
    return data;
}

export async function logoutUser(token) {
    const response = await fetch(`${AUTH_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Logout failed' };
    return data;
}