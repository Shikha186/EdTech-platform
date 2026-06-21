import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // 1. Initial State: Default to true (Dark Mode) if no local preference exists
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; 
  });

  // 2. Side Effect: Sync the DOM class with the state
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-muted border border-border text-foreground hover:bg-secondary transition-colors duration-200 cursor-pointer"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        /* Sun Icon (Displays when in dark mode to switch to light) */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-brand" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.243 3.05a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.706-.707a1 1 0 011.414 0zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-3.05 4.243a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.706a1 1 0 010-1.414zM10 14a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.243-3.05a1 1 0 010-1.414l.706-.707a1 1 0 111.414 1.414l-.706.707a1 1 0 01-1.414 0zM4 10a1 1 0 01-1-1H2a1 1 0 110 2h1a1 1 0 01-1-1zm1.757-4.243a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
        </svg>
      ) : (
        /* Moon Icon (Displays when in light mode to switch to dark) */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}