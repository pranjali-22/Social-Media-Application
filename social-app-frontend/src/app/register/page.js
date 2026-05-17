'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/api/auth';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Register() {
    const router = useRouter();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await registerUser(form.username, form.email, form.password);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success('Account created! Please login.');
            router.push('/login');
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Toaster />
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="username" placeholder="Username" onChange={handleChange}
                           className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange}
                           className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange}
                           className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" required />
                    <button type="submit" disabled={loading}
                            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
                        {loading ? 'Creating...' : 'Register'}
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account? <Link href="/login" className="font-semibold underline">Login</Link>
                </p>
            </div>
        </div>
    );
}