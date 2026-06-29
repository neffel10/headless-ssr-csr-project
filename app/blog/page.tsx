// src/app/blog/page.tsx

import sanitizeHtml from 'sanitize-html';
// 1. Importamos un nuevo componente contenedor que manejará el estado del filtro
import BlogClientWrapper from '../components/BlogClientWrapper'; 

interface Post {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
}

export default async function HomePage() {
  // El fetch sigue ocurriendo en el servidor de forma óptima
  const response = await fetch("https://espaciopsicologico.mx/wp-json/wp/v2/posts?_embed", {
    next: { revalidate: 60 } 
  });
  
  const rawPosts: Post[] = await response.json();

  const sanitizedPosts = rawPosts.map(post => ({
  ...post,
  excerpt: {
    rendered: sanitizeHtml(post.excerpt.rendered)
  }
}));

  return (
    <main className="min-h-screen bg-slate-50 max-w-7xl mx-auto p-6 md:p-10">
      <h1 className="text-4xl font-bold text-slate-950 mb-4 border-b border-slate-200 pb-5">
        Espacio Psicológico <span className="text-slate-500 font-normal">| Blog</span>
      </h1>
      
      {/* 2. Le pasamos los posts sanitizados al contenedor del cliente */}
      <BlogClientWrapper initialPosts={sanitizedPosts} />
    </main>
  );
}