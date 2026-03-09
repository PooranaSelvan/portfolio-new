import { useState, useCallback, useEffect, useRef } from 'react';
import { navLinks } from '../../data/portfolioData';
import { Close } from '../Common/Icons';
import ThemeToggle from '../Common/ThemeToggle';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  const navListRef = useRef(null);
  const indicatorRef = useRef(null);

  const updateIndicator = useCallback(() => {
    if (!navListRef.current || !indicatorRef.current) return;
    const activeLink = navListRef.current.querySelector('.nav-link.active');
    if (!activeLink) {
      indicatorRef.current.style.opacity = '0';
      return;
    }
    const listRect = navListRef.current.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    indicatorRef.current.style.opacity = '1';
    indicatorRef.current.style.width = `${linkRect.width}px`;
    indicatorRef.current.style.height = `${linkRect.height}px`;
    indicatorRef.current.style.transform = `translateX(${linkRect.left - listRect.left}px)`;
  }, []);

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

  /* Re-position the sliding indicator whenever activeId changes or on resize */
  useEffect(() => {
    /* Small rAF delay so the DOM class has been applied first */
    const id = requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeId, updateIndicator]);

  return (
    <header className="header" id="header">
      <nav className="nav">
        <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
          <span className="logo-text">PS</span>
        </a>

        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-list" ref={navListRef}>
            {/* Sliding pill indicator */}
            <li className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
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
          <ThemeToggle />
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
