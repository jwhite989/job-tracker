import { createClient } from '@/lib/supabase/server';
import LogoutButton from './components/LogoutButton';
import AddJobForm from './components/AddJobForm';
import JobCard from './components/JobCard';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import StatsSection from './components/StatsSection';
import { fetchFilteredJobs } from '@/app/actions/jobs';
import { Suspense } from 'react';

async function JobsList({ query, status }: { query: string; status: string }) {
  const jobs = await fetchFilteredJobs(query, status);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        Your Applications ({jobs.length})
      </h2>

      {jobs.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500 text-lg">
            {query || status !== 'all'
              ? 'No applications match your search/filter'
              : 'No applications yet. Add your first one above!'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; status?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const params = await searchParams;
  const query = params?.query || '';
  const status = params?.status || 'all';

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Application Tracker</h1>
          <p className="text-gray-600">Welcome, {user?.email}</p>
        </div>
        <LogoutButton />
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <StatsSection />
      </Suspense>

      <AddJobForm />

      <div className="grid md:grid-cols-2 gap-4">
        <SearchBar />
        <StatusFilter />
      </div>

      <Suspense
        fallback={
          <div className="text-center py-12">Loading applications...</div>
        }
      >
        <JobsList query={query} status={status} />
      </Suspense>
    </main>
  );
}
