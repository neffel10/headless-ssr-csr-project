// src/app/components/BlogClientWrapper.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBox from './SearchBox';

interface Post {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
}

export default function BlogClientWrapper({ initialPosts }: { initialPosts: Post[] }) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

  const handleSearch = (searchTerm: string) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = initialPosts.filter(post => 
      post.title.rendered.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredPosts(filtered);
  };

  return (
    <>
      {/* Renderizamos el input del buscador */}
      <SearchBox onSearch={handleSearch} />

      {/* Renderizamos el grid de tarjetas filtradas */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="p-7 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <h2 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight">
                {post.title.rendered}
              </h2>
              
              <div 
                className="text-slate-700 prose prose-slate prose-sm max-w-none mb-5 flex-grow"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
              />

              <div className="mt-auto pt-4 border-t border-slate-100">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="text-sm font-medium text-sky-700 hover:text-sky-900 transition"
                >
                  Leer más →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="text-slate-500 col-span-2 text-lg">No se encontraron artículos que coincidan con tu búsqueda.</p>
        )}
      </div>
    </>
  );
}