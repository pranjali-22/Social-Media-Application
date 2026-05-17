'use client';
import { useEffect, useState } from 'react';
import { getExploreFeed } from '../../api/feed';
import Navbar from '../../components/Navbar';
import PostCard from '../../components/PostCard';

export default function ExplorePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getExploreFeed().then((res) => {
            if (!res.error) setPosts(res.data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-xl mx-auto pt-20 pb-10 px-4">
                <h2 className="text-xl font-bold mb-6">Explore</h2>
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-400">No posts yet.</p>
                ) : (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                )}
            </div>
        </div>
    );
}