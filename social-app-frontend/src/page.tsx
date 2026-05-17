import Link from 'next/link';

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-2">SocialApp</h1>
        <p className="text-gray-500 mb-8">Share your moments</p>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2 bg-black text-white rounded-lg">Login</Link>
          <Link href="/register" className="px-6 py-2 border border-black rounded-lg">Register</Link>
        </div>
      </div>
  );
}