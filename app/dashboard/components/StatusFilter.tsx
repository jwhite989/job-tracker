'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
];

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStatus = searchParams.get('status') || 'all';

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);

    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Filter by Status</label>
      <div className="flex gap-2 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => handleFilter(status.value)}
            className={`px-4 py-2 rounded ${
              currentStatus === status.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}
