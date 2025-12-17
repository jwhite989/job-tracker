'use client';

import { useState } from 'react';
import { deleteJob } from '@/app/actions/jobs';
import type { JobApplication } from '@/types/database';
import EditJobForm from './EditJobForm';

const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  interview: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function JobCard({ job }: { job: JobApplication }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete application for ${job.position} at ${job.company}?`)) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteJob(job.id);

    if (result.error) {
      alert(result.error);
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(job.applied_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (isEditing) {
    return <EditJobForm job={job} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="rounded-lg border p-4 shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold">{job.position}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[job.status]
          }`}
        >
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Applied:</span> {formattedDate}
        </p>

        {job.salary && (
          <p>
            <span className="font-medium">Salary:</span> $
            {job.salary.toLocaleString()}
          </p>
        )}

        {job.location && (
          <p>
            <span className="font-medium">Location:</span> {job.location}
          </p>
        )}

        {job.notes && (
          <p className="mt-2">
            <span className="font-medium">Notes:</span> {job.notes}
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-1 rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Edit
        </button>

        {job.job_url && (
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded bg-gray-600 py-2 text-center text-white hover:bg-gray-700"
          >
            View Job
          </a>
        )}

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 rounded bg-red-600 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
