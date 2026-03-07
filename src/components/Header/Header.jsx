import { useState, useCallback, useEffect } from 'react';
import { navLinks } from '../../data/portfolioData';
import { Close } from '../Common/Icons';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const ids = navLinks.map(l => l.id);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="header" id="header">
      <nav className="nav">
        <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
          <span className="logo-text">PS</span>
        </a>

        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav-link${activeId === link.id ? ' active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-close" onClick={() => setMenuOpen(false)}>
            <Close />
          </button>
        </div>

        <div className="nav-actions">
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
