import Link from 'next/link';

interface PostCardProps {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

export default function PostCard({ slug, title, summary, date }: PostCardProps) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <Link href={`/news/${slug}`} className="text-2xl font-bold text-primary hover:underline">
  {title}
</Link>

      <p className="text-gray-700">{summary}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
}
