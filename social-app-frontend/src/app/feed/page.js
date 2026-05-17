'use client';
import { useEffect, useState } from 'react';
import { getHomeFeed } from '../../api/feed';
import useAuthStore from '../../store/authStore';
import Navbar from '../../components/Navbar';
import PostCard from '../../components/PostCard';
import { useRouter } from 'next/navigation';

export default function FeedPage() {
    const { token } = useAuthStore();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) { router.push('/login'); return; }
        getHomeFeed(token).then((res) => {
            if (!res.error) setPosts(res.data);
            setLoading(false);
        });
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-xl mx-auto pt-20 pb-10 px-4">
                <h2 className="text-xl font-bold mb-6">Home Feed</h2>
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-400">No posts yet. Follow some users!</p>
                ) : (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                )}
            </div>
        </div>
    );
}