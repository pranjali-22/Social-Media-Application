'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPost } from '../../../api/posts';
import { getComments, addComment } from '../../../api/comments';
import { likeTarget, unlikeTarget } from '../../../api/likes';
import useAuthStore from '../../../store/authStore';
import Navbar from '../../../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';

export default function PostDetail() {
    const { id } = useParams();
    const { token } = useAuthStore();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getPost(id), getComments(id)]).then(([postRes, commentsRes]) => {
            if (!postRes.error) setPost(postRes.data);
            if (!commentsRes.error) setComments(commentsRes.data);
            setLoading(false);
        });
    }, [id]);

    const handleLike = async () => {
        const res = await likeTarget(token, id, 'post');
        if (res.error) toast.error(res.error);
        else setPost((p) => ({ ...p, likeCount: p.likeCount + 1 }));
    };

    const handleUnlike = async () => {
        const res = await unlikeTarget(token, id, 'post');
        if (res.error) toast.error(res.error);
        else setPost((p) => ({ ...p, likeCount: p.likeCount - 1 }));
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        const res = await addComment(token, id, content);
        if (res.error) toast.error(res.error);
        else {
            setComments((prev) => [res.data, ...prev]);
            setContent('');
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster />
            <Navbar />
            <div className="max-w-xl mx-auto pt-20 pb-10 px-4">
                {post && (
                    <div className="bg-white rounded-xl shadow p-6 mb-4">
                        <p className="font-semibold mb-1">@{post.user?.username}</p>
                        <p className="text-gray-800 mb-4">{post.caption}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                            <button onClick={handleLike} className="hover:text-black">♥ {post.likeCount}</button>
                            <button onClick={handleUnlike} className="hover:text-red-500">Unlike</button>
                            <span>💬 {post.commentCount}</span>
                        </div>
                    </div>
                )}
                <form onSubmit={handleComment} className="bg-white rounded-xl shadow p-4 mb-4 flex gap-2">
                    <input value={content} onChange={(e) => setContent(e.target.value)}
                           placeholder="Write a comment..."
                           className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                    <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg text-sm">Post</button>
                </form>
                <div className="flex flex-col gap-3">
                    {comments.map((c) => (
                        <div key={c._id} className="bg-white rounded-xl shadow p-4">
                            <p className="font-semibold text-sm">@{c.user?.username}</p>
                            <p className="text-gray-700 text-sm">{c.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}