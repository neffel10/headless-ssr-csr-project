// src/app/components/SearchBox.tsx
'use client'; // 1. OBLIGATORIO: Le dice a Next.js que este componente se ejecuta en el navegador

import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pasamos el texto hacia arriba al componente padre
  };

  return (
    <div className="mb-8 max-w-md">
      <label htmlFor="search" className="sr-only">Buscar artículos</label>
      <div className="relative">
        <input
          id="search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar artículos por título..."
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