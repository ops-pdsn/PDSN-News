'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-darkbg shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-xl text-primary">PDSN News</Link>
        <nav className="flex gap-6 items-center">
          <Link href="/news">News</Link>
          <Link href="/videos">Videos</Link>
          <Link href="/podcasts">Podcasts</Link>
          <Link href="/galleries">Gallery</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <button onClick={toggleDarkMode} className="text-xl">
            {darkMode ? '🌞' : '🌜'}
          </button>
        </nav>
      </div>
    </header>
  );
}
