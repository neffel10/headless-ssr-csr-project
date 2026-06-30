# Headless WordPress Blog with Next.js & Tailwind CSS

A modern, high-performance Headless Blog built with **Next.js 15+ (App Router)** and **TypeScript**, consuming data dynamically from a remote WordPress REST API instance. 

[🇺🇸 English Description](#features) | [🇲🇽 Descripción en Español](#descripción-del-proyecto-en-español)

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
