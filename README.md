# Headless WordPress Blog with Next.js & Tailwind CSS

A modern, high-performance Headless Blog built with **Next.js 15+ (App Router)** and **TypeScript**, consuming data dynamically from a remote WordPress REST API instance. 

[🇺🇸 English Description](#features) | [🇲🇽 Descripción en Español](#caracteristicas)

---

## Features
* 🚀 **Hybrid Architecture (SSR + CSR):** Server-side rendering for optimal SEO and performance, combined with client-side interactive components.
* 🔍 **Real-Time Client-Side Search:** Instant post filtering on the frontend without extra API overhead.
* 🖼️ **Next.js Image Optimization:** Automatic `.webp` conversion, lazy loading, and fine-tuned responsive `sizes` properties from external WordPress media links.
* 🛡️ **Serverless HTML Sanitization:** Cleaned WordPress HTML inputs using native `sanitize-html` to neutralize XSS injection vulnerabilities without JSDOM overhead.
* 🎨 **Tailwind CSS Styling:** A clean, minimal layout focused on high typographic readability and smooth interactions (`group-hover` transitions).

## Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Sanitization:** `sanitize-html`
* **Data Source:** WordPress REST API (`/wp-json/wp/v2/posts`)

---

## Getting Started

### Prerequisites
Make sure you have Node.js (v18.x or higher) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd YOUR_REPO_NAME

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## caracteristicas
Este es un blog moderno de alto rendimiento que funciona bajo una arquitectura Headless (Desacoplada). Utiliza el CMS de WordPress únicamente como backend de contenidos mediante su API REST nativa, mientras que el Frontend está construido completamente desde cero con Next.js.

Puntos Clave de Ingeniería:
Optimización Extrema de Imágenes: Configuración de remotePatterns en Next.js para interceptar imágenes de WordPress, comprimirlas a formatos modernos y limitar su descarga con precisión matemática mediante la propiedad sizes en el grid de Tailwind.

Mitigación de Errores en Servidor (ESM vs CommonJS): Implementación de sanitize-html en lugar de librerías híbridas pesadas para garantizar un entorno serverless compatible con los flujos estrictos de Vercel.

Navegación Intuitiva (UX): Unificación de áreas de impacto con la Ley de Fitts, permitiendo que tanto el título (con transiciones de color dinámicas) como los elementos tradicionales guíen al usuario sin fricción.

Architecture Insights
Hybrid Data Fetching Flow
The application uses Server Components (src/app/blog/page.tsx) to pull the raw posts securely from the server with a 60-second revalidation caching strategy:

TypeScript
// Example of the server-side pre-rendering cache approach used:
const response = await fetch("https://your-wordpress-domain/wp-json/wp/v2/posts?_embed", {
  next: { revalidate: 60 } 
});
The parsed data is then safely processed and passed down to a Client Component Wrapper (BlogClientWrapper.tsx) to enable lightning-fast client-side searching over the pre-fetched state, removing unnecessary database load on the WordPress server.

License
Distributed under the MIT License. See LICENSE for more information.

---

### 🚀 Sube tu documentación a GitHub

Una vez que guardes este archivo, ejecuta los comandos de siempre para que impacte en tu repositorio:

```bash
git add README.md
git commit -m "Docs: crear README bilingüe profesional con detalles de arquitectura"
git push origin main

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.