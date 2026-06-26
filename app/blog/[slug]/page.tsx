// src/app/blog/[slug]/page.tsx

import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { params } = props;
  const { slug } = await params;

  // El fetch que ya comprobamos que funciona perfectamente
  const response = await fetch(`https://espaciopsicologico.mx/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 60 }
  });

  const posts: WPPost[] = await response.json();
  const post = posts[0]; // Tomamos el post que devolvió la API

  // Si por algo no existiera, se protege la ruta
  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Post no encontrado</h1>
        <Link href="/blog" className="text-sky-700 hover:underline mt-4 inline-block">← Volver al blog</Link>
      </main>
    );
  }

  // Sanitizamos el contenido completo
  const sanitizedContent = sanitizeHtml(post.content.rendered);

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        
        {/* Cambiamos el link para que regrese a /blog, que es tu nuevo listado */}
        <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-6 inline-block">
          ← Volver al blog
        </Link>

        {/* Título del Post */}
        <h1 
          className="text-3xl md:text-4xl font-bold text-slate-950 mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
        />

        {/* Contenido Completo del Artículo */}
        {/* src/app/blog/[slug]/page.tsx */}

{/* Reemplaza tu contenedor antiguo por este: */}
<div 
  className="text-slate-800 max-w-none font-normal leading-relaxed
             [&>p]:mb-5 [&>p]:text-slate-800 [&>p]:text-base md:[&>p]:text-lg
             [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-950 [&>h2]:mt-8 [&>h2]:mb-4
             [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-slate-950 [&>h3]:mt-6 [&>h3]:mb-3
             [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul_li]:mb-2
             [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol_li]:mb-2
             [&>a]:text-sky-700 hover:[&>a]:text-sky-900 [&>a]:underline [&>a]:font-medium"
  dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
/>
        
      </article>
    </main>
  );
}