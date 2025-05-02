// pages/news/[slug].tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { remark } from 'remark';
import html from 'remark-html';

interface PostProps {
  title: string;
  date: string;
  cover: string;
  contentHtml: string;
}

export default function Post({ title, date, cover, contentHtml }: PostProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-4">{date}</p>
      {cover && <img src={cover} alt={title} className="mb-4" />}
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'content/articles');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(process.cwd(), 'content/articles', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      title: matterResult.data.title,
      date: matterResult.data.date,
      cover: matterResult.data.cover || null,
      contentHtml,
    },
  };
};
