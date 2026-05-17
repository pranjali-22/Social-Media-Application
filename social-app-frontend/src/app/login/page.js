'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../api/auth';
import useAuthStore from '@/store/authStore';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await loginUser(form.email, form.password);
        if (res.error) {
            toast.error(res.error);
        } else {
            const token = res.data.accessToken;
            // decode username from token
            const payload = JSON.parse(atob(token.split('.')[1]));
            setAuth({ username: payload.username }, token);
            toast.success('Logged in!');
            router.push('/feed');
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Toaster />
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="email" type="email" placeholder="Email" onChange={handleChange}
                           className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange}
                           className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
                    <button type="submit" disabled={loading}
                            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    No account? <Link href="/register" className="font-semibold underline">Register</Link>
                </p>
            </div>
        </div>
    );
}