'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.push(`/dashboard?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium mb-1">
        Search Applications
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search by company or position..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query') || ''}
        className="w-full rounded border p-2 text-white"
      />
    </div>
  );
}
