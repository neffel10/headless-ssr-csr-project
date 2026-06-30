// src/app/components/BlogClientWrapper.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBox from './SearchBox';
import Image from 'next/image';

// Importing the Post interface to ensure type safety for the posts being passed down
// Update interface to accept embedded image data from WordPress
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

// This component is responsible for rendering the list of blog posts and handling the search functionality
export default function BlogClientWrapper({ initialPosts }: { initialPosts: Post[] }) {
const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

  const handleSearch = (searchTerm: string) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = initialPosts.filter(post => 
      post.title.rendered.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredPosts(filtered);
  };

  // Render the search box and the list of filtered posts
  return (
    <>
      <SearchBox onSearch={handleSearch} />

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {

            // Extract featured image and alt text safely
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const altText = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;

            // Render each post with its title, excerpt, and a link to the full article
            return (
              <article 
                key={post.id} 
                className="overflow-hidden bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* 3. Conditional Rendering of the Featured Image */}
                {featuredImage && (
                  <div className="relative w-full h-48 md:h-56 bg-slate-100">
                    <Image
                      src={featuredImage}
                      alt={altText}
                      fill // Makes the image fill the parent container
                      sizes="(max-width: 768px) 100vw, 384px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority={post.id === initialPosts[0]?.id} // Optimize the loading of the first image (LCP)
                    />
                  </div>
                )}

                {/*Sanitized Content*/}
                <div className="p-7 flex flex-col flex-grow">
                  <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight group-hover:text-sky-800 transition-colors duration-200"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  </Link>
                  
                  <div 
                    className="text-slate-700 prose prose-slate prose-sm max-w-none mb-5 flex-grow"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                  />

                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="text-sm font-medium text-sky-700 hover:text-sky-900 transition"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className="text-slate-500 col-span-2 text-lg">Unable to found articles.</p>
        )}
      </div>
    </>
  );
}