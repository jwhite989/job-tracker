'use client';

import { useActionState } from 'react';
import { updateJob } from '@/app/actions/jobs';
import type { JobApplication } from '@/types/database';
import { useEffect } from 'react';

const initialState = {
  error: null,
  success: false,
};

export default function EditJobForm({
  job,
  onCancel,
}: {
  job: JobApplication;
  onCancel: () => void;
}) {
  const updateJobWithId = updateJob.bind(null, job.id);
  const [state, formAction] = useActionState(updateJobWithId, initialState);

  useEffect(() => {
    if (state?.success) {
      onCancel();
    }
  }, [state?.success, onCancel]);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border p-6 bg-gray-50"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Edit Application</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      {state?.error && (
        <div className="rounded bg-red-50 p-3 text-red-600">{state.error}</div>
      )}

      <div>
        <label htmlFor="company" className="block text-sm font-medium">
          Company *
        </label>
        <input
          type="text"
          name="company"
          id="company"
          required
          defaultValue={job.company}
          className="mt-1 w-full rounded border p-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium">
          Position *
        </label>
        <input
          type="text"
          name="position"
          id="position"
          required
          defaultValue={job.position}
          className="mt-1 w-full rounded border p-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status *
        </label>
        <select
          name="status"
          id="status"
          required
          defaultValue={job.status}
          className="mt-1 w-full rounded border p-2 text-white"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label htmlFor="applied_date" className="block text-sm font-medium">
          Applied Date *
        </label>
        <input
          type="date"
          name="applied_date"
          id="applied_date"
          required
          defaultValue={job.applied_date}
          className="mt-1 w-full rounded border p-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="salary" className="block text-sm font-medium">
          Salary (optional)
        </label>
        <input
          type="number"
          name="salary"
          id="salary"
          defaultValue={job.salary || ''}
          className="mt-1 w-full rounded border p-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium">
          Location (optional)
        </label>
        <input
          type="text"
          name="location"
          id="location"
          defaultValue={job.location || ''}
          className="mt-1 w-full rounded border p-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="job_url" className="block text-sm font-medium">
          Job URL (optional)
        </label>
        <input
          type="url"
          name="job_url"
          id="job_url"
          defaultValue={job.job_url || ''}
          className="mt-1 w-full rounded border p-2 text-white"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium">
          Notes (optional)
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          defaultValue={job.notes || ''}
          className="mt-1 w-full rounded border p-2 text-white"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded bg-gray-600 py-2 text-white hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
