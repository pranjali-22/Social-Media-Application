import { API_BASE_URL } from './apiURL.js';
const COMMENT_URL = `${API_BASE_URL}/api/v1/comments`;

export async function addComment(token, postId, content) {
    const response = await fetch(`${COMMENT_URL}/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content })
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to add comment' };
    return data;
}

export async function getComments(postId) {
    const response = await fetch(`${COMMENT_URL}/${postId}`);
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to fetch comments' };
    return data;
}

export async function deleteComment(token, commentId) {
    const response = await fetch(`${COMMENT_URL}/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to delete comment' };
    return data;
}

export async function replyComment(token, postId, parentId, content) {
    const response = await fetch(`${COMMENT_URL}/${postId}/reply/${parentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content })
    });
    const data = await response.json().catch(() => ({ error: 'Unknown error' }));
    if (!response.ok) return { error: data.error?.message || 'Failed to reply' };
    return data;
}