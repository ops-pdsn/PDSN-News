'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDark = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-darkbg shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">PDSN News</Link>
        <nav className="flex items-center gap-5">
          <Link href="/news">News</Link>
          <Link href="/videos">Videos</Link>
          <Link href="/podcasts">Podcasts</Link>
          <Link href="/galleries">Gallery</Link>
          <button onClick={toggleDark} className="text-xl">{darkMode ? '🌞' : '🌜'}</button>
        </nav>
      </div>
    </header>
  );
}
