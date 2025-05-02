import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import PostCard from '../components/PostCard';

export default function Home({ allPostsData }: { allPostsData: any[] }) {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Latest Articles</h1>
      <ul>
        {allPostsData.map(({ slug, date, title, summary }) => (
          <li key={slug} className="mb-6">
            <Link href={`/news/${slug}`}>
              <a className="text-2xl font-semibold text-primary hover:underline">{title}</a>
            </Link>
            <p className="text-gray-600">{summary}</p>
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
