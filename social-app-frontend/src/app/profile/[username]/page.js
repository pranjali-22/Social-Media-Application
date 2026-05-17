'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProfile } from '@/api/user';
import { getUserPosts } from '@/api/posts';
import { followUser, unfollowUser } from '@/api/follow';
import useAuthStore from '@/store/authStore';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
    const { username } = useParams();
    const { token, user } = useAuthStore();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getProfile(username), getUserPosts(username)]).then(([profileRes, postsRes]) => {
            if (!profileRes.error) setProfile(profileRes.data);
            if (!postsRes.error) setPosts(postsRes.data);
            setLoading(false);
        });
    }, [username]);

    const handleFollow = async () => {
        const res = await followUser(token, profile._id);
        if (res.error) toast.error(res.error);
        else {
            toast.success('Followed!');
            setProfile((p) => ({ ...p, profile: { ...p.profile, followerCount: p.profile.followerCount + 1 } }));
        }
    };

    const handleUnfollow = async () => {
        const res = await unfollowUser(token, profile._id);
        if (res.error) toast.error(res.error);
        else {
            toast.success('Unfollowed!');
            setProfile((p) => ({ ...p, profile: { ...p.profile, followerCount: p.profile.followerCount - 1 } }));
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster />
            <Navbar />
            <div className="max-w-xl mx-auto pt-20 pb-10 px-4">
                {profile && (
                    <div className="bg-white rounded-xl shadow p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">{profile.username}</h2>
                                <p className="text-gray-500 text-sm">{profile.profile?.fullName}</p>
                                <p className="text-gray-700 mt-1">{profile.profile?.bio}</p>
                                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                                    <span><b>{profile.profile?.followerCount || 0}</b> followers</span>
                                    <span><b>{profile.profile?.followingCount || 0}</b> following</span>
                                    <span><b>{posts.length}</b> posts</span>
                                </div>
                            </div>
                            {user?.username !== username && (
                                <div className="flex gap-2">
                                    <button onClick={handleFollow}
                                            className="px-4 py-1 bg-black text-white text-sm rounded-lg">
                                        Follow
                                    </button>
                                    <button onClick={handleUnfollow}
                                            className="px-4 py-1 border border-black text-sm rounded-lg">
                                        Unfollow
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    {posts.length === 0 ? (
                        <p className="text-center text-gray-400">No posts yet.</p>
                    ) : (
                        posts.map((post) => <PostCard key={post._id} post={post} />)
                    )}
                </div>
            </div>
        </div>
    );
}