import { fetchJobStats } from '@/app/actions/jobs';

const statusConfig = {
  total: { label: 'Total Applications', color: 'bg-gray-100 text-gray-800' },
  applied: { label: 'Applied', color: 'bg-blue-100 text-blue-800' },
  interview: { label: 'Interviews', color: 'bg-yellow-100 text-yellow-800' },
  offer: { label: 'Offers', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
};

export default async function StatsSection() {
  const stats = await fetchJobStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Object.entries(statusConfig).map(([key, config]) => (
        <div key={key} className={`rounded-lg p-4 ${config.color}`}>
          <p className="text-sm font-medium">{config.label}</p>
          <p className="text-3xl font-bold mt-2">
            {stats[key as keyof typeof stats]}
          </p>
        </div>
      ))}
    </div>
  );
}
