// components/TopHero.js
'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function TopHero({ article }) {
  return (
    <section className="bg-lightbg dark:bg-darkbg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image 
              src={article.image} 
              alt={article.title} 
              width={800} 
              height={500} 
              className="rounded-lg w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="space-y-5">
            <Link href={`/news/${article.slug}`} className="text-primary font-semibold uppercase text-xs">
              {article.category}
            </Link>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
              {article.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {article.summary}
            </p>
            <Link href={`/news/${article.slug}`} className="inline-block mt-4 text-primary font-semibold hover:underline">
              Read Full Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
