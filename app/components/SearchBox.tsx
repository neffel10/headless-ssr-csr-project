// src/app/components/SearchBox.tsx
'use client'; // 1. NOT OPTIONAL: Tells Next.js that this component runs in the browser

import { useState } from 'react';

// 2. Define the props for the SearchBox component, which includes a callback function to handle search input
interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

// 3. The SearchBox component allows users to input a search term, which is passed up to the parent component via the onSearch callback
export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  // 4. Handle changes in the input field, updating the local state and calling the onSearch callback with the new value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the search term up to the parent component for filtering
  };

  return (
    <div className="mb-8 max-w-md">
      <label htmlFor="search" className="sr-only">Search articles</label>
      <div className="relative">
        <input
          id="search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search articles by title..."
          className="w-full px-5 py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent
                     placeholder-slate-400 transition"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
          🔍
        </div>
      </div>
    </div>
  );
}