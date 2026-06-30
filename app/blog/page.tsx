// src/app/blog/page.tsx

import sanitizeHtml from 'sanitize-html';
// 1. Import a new wrapper component that will handle the filter state
import BlogClientWrapper from '../components/BlogClientWrapper'; 


// 2. Define the Post interface to type the data we receive from WordPress
interface Post {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
}

// 3. The main function for the blog page
export default async function HomePage() {

  // The fetch still occurs on the server optimally
  const response = await fetch("https://espaciopsicologico.mx/wp-json/wp/v2/posts?_embed", {
    next: { revalidate: 60 } 
  });
  
  const rawPosts: Post[] = await response.json();

  // 4. Sanitize the excerpts to prevent XSS attacks
  const sanitizedPosts = rawPosts.map(post => ({
  ...post,
  excerpt: {
    rendered: sanitizeHtml(post.excerpt.rendered)
  }
}));

  // 5. Pass the sanitized posts to the client wrapper for rendering and filtering
  return (
    <main className="min-h-screen bg-slate-50 max-w-7xl mx-auto p-6 md:p-10">
      <h1 className="text-4xl font-bold text-slate-950 mb-4 border-b border-slate-200 pb-5">
        Espacio Psicológico <span className="text-slate-500 font-normal">| Blog</span>
      </h1>
      
      {/* We pass the sanitized posts to the client wrapper */}
      <BlogClientWrapper initialPosts={sanitizedPosts} />
    </main>
  );
}