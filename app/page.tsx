import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Link
        href="/auth/login"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Go to Login
      </Link>
    </main>
  );
}
