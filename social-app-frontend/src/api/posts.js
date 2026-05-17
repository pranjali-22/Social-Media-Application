import { API_BASE_URL } from './apiUrl.js';
const POST_URL = `${API_BASE_URL}/api/v1/posts`;

export async function createPost(token, postData) {
    const response = await fetch(`${POST_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(postData)
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to create post' };
    return data;
}

export async function getPost(id) {
    const response = await fetch(`${POST_URL}/${id}`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch post' };
    return data;
}

export async function deletePost(token, id) {
    const response = await fetch(`${POST_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to delete post' };
    return data;
}

export async function getUserPosts(username) {
    const response = await fetch(`${POST_URL}/user/${username}`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch posts' };
    return data;
}