'use client';

import { useActionState } from 'react';
import { createJob } from '@/app/actions/jobs';
import { useEffect, useRef } from 'react';

const initialState: { error?: string; success: boolean } = {
  success: false,
};

export default function AddJobForm() {
  const [state, formAction] = useActionState(createJob, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      const dateInput = formRef.current?.querySelector<HTMLInputElement>(
        'input[name="applied_date"]'
      );
      if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
    }
  }, [state?.success]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-lg border p-6"
    >
      <h2 className="text-xl font-bold">Add New Job Application</h2>

      {state?.error && (
        <div className="rounded bg-red-50 p-3 text-red-600">{state.error}</div>
      )}

      {state?.success && (
        <div className="rounded bg-green-50 p-3 text-green-600">
          Job application added successfully!
        </div>
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
          className="mt-1 w-full rounded border p-2 text-white"
          placeholder="e.g., Google"
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
          className="mt-1 w-full rounded border p-2 text-white"
          placeholder="e.g., Software Engineer"
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
          defaultValue={today}
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
          className="mt-1 w-full rounded border p-2 text-white"
          placeholder="e.g., 75000"
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
          className="mt-1 w-full rounded border p-2 text-white"
          placeholder="e.g., Remote, New York, etc."
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
          className="mt-1 w-full rounded border p-2 text-white"
          placeholder="https://..."
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
          className="mt-1 w-full rounded border p-2 text-white"
          placeholder="Any additional notes..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Add Application
      </button>
    </form>
  );
}
