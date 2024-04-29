import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState('light');  // Default theme

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.body.className = storedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
    <div className={`toggle-thumb ${theme === 'dark' ? 'toggle-thumb-on' : ''}`}>
      {theme === 'light' ? <FaSun className='fa-sun' size={16} /> : <FaMoon className='fa-moon' size={16} />}
    </div>
  </div>
  );
};

export default ThemeToggle;
