import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '@/components/Header';
import { GetStaticProps } from 'next';

type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

interface HomeProps {
  allPostsData: Post[];
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>

        {!Array.isArray(allPostsData) || allPostsData.length === 0 ? (
          <p className="text-red-500">No articles found.</p>
        ) : (
          allPostsData.map((post) => (
            <div key={post.slug} className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold text-primary">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">{post.date}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {post.summary}
              </p>
            </div>
          ))
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'content/articles');
  let allPostsData: Post[] = [];

  try {
    const fileNames = fs.readdirSync(postsDirectory);

    allPostsData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        summary: data.summary || '',
      };
    });

    allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (err) {
    console.error('Error loading posts:', err);
  }

  return {
    props: {
      allPostsData,
    },
  };
};
