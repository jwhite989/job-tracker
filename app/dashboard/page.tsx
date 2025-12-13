import { createClient } from '@/lib/supabase/server';
import LogoutButton from './components/LogoutButton';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-gray-950 p-6 text-white">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Job Application Tracker</h1>
        <LogoutButton />
      </header>
      <p className="text-gray-300">
        Welcome, <span className="font-medium">{user?.email}</span>
      </p>
    </main>
  );
}
