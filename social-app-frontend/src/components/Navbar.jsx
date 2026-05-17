'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store/authStore';

export default function Navbar() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <Link href="/feed" className="text-xl font-bold">SocialApp</Link>
            <div className="flex items-center gap-6">
                <Link href="/feed" className="text-sm font-medium hover:text-gray-500">Home</Link>
                <Link href="/explore" className="text-sm font-medium hover:text-gray-500">Explore</Link>
                <Link href="/notifications" className="text-sm font-medium hover:text-gray-500">Notifications</Link>
                {user?.username && (
                    <Link href={`/profile/${user.username}`} className="text-sm font-medium hover:text-gray-500">
                        Profile
                    </Link>
                )}
                <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700">
                    Logout
                </button>
            </div>
        </nav>
    );
}