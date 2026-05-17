'use client';
import Link from 'next/link';

export default function PostCard({ post }) {
    return (
        <div className="bg-white rounded-xl shadow p-5 mb-4">
            <div className="flex items-center justify-between mb-2">
                <Link href={`/profile/${post.user?.username}`} className="font-semibold text-sm hover:underline">
                    @{post.user?.username}
                </Link>
                <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-800 mb-3">{post.caption}</p>
            <div className="flex gap-4 text-sm text-gray-500">
                <span>♥ {post.likeCount}</span>
                <span>💬 {post.commentCount}</span>
                <Link href={`/posts/${post._id}`} className="ml-auto text-black font-medium text-xs hover:underline">
                    View Post
                </Link>
            </div>
        </div>
    );
}