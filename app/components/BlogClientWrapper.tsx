// src/app/components/BlogClientWrapper.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBox from './SearchBox';
import Image from 'next/image';


// Actualizamos la interfaz para aceptar los datos embebidos de la imagen de WordPress
interface Post {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
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
      <SearchBox onSearch={handleSearch} />

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            // 2. Extraemos de forma segura la URL de la imagen destacada
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const altText = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;

            return (
              <article 
                key={post.id} 
                className="overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* 3. Renderizado Condicional de la Imagen Destacada */}
                {featuredImage && (
                  <div className="relative w-full h-48 md:h-56 bg-slate-100">
                    <Image
                      src={featuredImage}
                      alt={altText}
                      fill // Hace que la imagen llene el contenedor relativo
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority={post.id === initialPosts[0]?.id} // Optimiza la carga de la primera imagen (LCP)
                    />
                  </div>
                )}

                <div className="p-7 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  
                  <div 
                    className="text-slate-700 prose prose-slate prose-sm max-w-none mb-5 flex-grow"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                  />

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="text-sm font-medium text-sky-700 hover:text-sky-900 transition"
                    >
                      Leer más →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className="text-slate-500 col-span-2 text-lg">No se encontraron artículos.</p>
        )}
      </div>
    </>
  );
}