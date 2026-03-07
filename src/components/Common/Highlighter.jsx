import { useState, useEffect, useRef } from 'react';
import './Highlighter.css';


export default function Highlighter({
  children,
  color = 'var(--clr-primary)',
  strokeWidth = 3,
  delay = 800,
  className = '',
}) {
  const wrapperRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={`highlighter-wrapper ${className}`} ref={wrapperRef}>
      {children}
      <svg className={`highlighter-svg ${show ? 'highlighter-animate' : ''}`} viewBox="0 0 200 12" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Main wavy underline */}
        <path d="M2 8 C 30 3, 50 10, 80 6 S 130 2, 160 7 S 185 4, 198 6" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="highlighter-path" />
        {/* Subtle second stroke for hand-drawn feel */}
        <path d="M4 9 C 35 5, 55 11, 85 7 S 135 3, 165 8 S 188 5, 196 7" fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeLinecap="round" strokeLinejoin="round" className="highlighter-path highlighter-path-secondary" opacity="0.4" />
      </svg>
    </span>
  );
}
