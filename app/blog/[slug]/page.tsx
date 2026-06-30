// src/app/blog/[slug]/page.tsx
import sanitizeHtml from 'sanitize-html';
import Link from 'next/link';
import Image from 'next/image';

// 1. Define the Post interface to type the data we receive from WordPress
export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { params } = props;
  const { slug } = await params; // Capture the slug from the URL parameters

  // Fetch the post data from WordPress using the slug, including embedded media for images
  const response = await fetch(`https://espaciopsicologico.mx/wp-json/wp/v2/posts?slug=${slug}&_embed`, {
    next: { revalidate: 60 }
  });

  // Handle the case where the response is not OK (e.g., network issues, server errors)
  if (!response.ok) {
    return (
      <main className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Communication Error with Server</h1>
        <Link href="/blog" className="text-sky-700 hover:underline mt-4 inline-block">← Back to blog</Link>
      </main>
    );
  }

  const posts = await response.json();

  // If the array is empty, it means the post does not exist.
  if (!posts || posts.length === 0) {
    return (
      <main className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Article not found</h1>
        <Link href="/blog" className="text-sky-700 hover:underline mt-4 inline-block">← Back to blog</Link>
      </main>
    );
  }

  const post = posts[0]; // We take the first post from the array, as slugs are unique.

  // Extract the featured image and alt text safely
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const altText = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;

  const sanitizedContent = sanitizeHtml(post.content.rendered, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'iframe' ]) // Allow img and iframe tags for embedded content
  });

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
      {featuredImage && (
        <div className="relative w-full h-64 md:h-96 bg-slate-900">
          <Image
            src={featuredImage}
            alt={altText}
            fill
            // Add this line to limit the maximum download size of the image
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover opacity-90"
            priority
          />
        </div>
      )}

      <div className="p-8 md:p-12">
        <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-6 inline-block">
          ← Back to blog
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-8 leading-tight"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
        />

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
      </div>
        
      </article>
    </main>
  );
}