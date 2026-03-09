import { useState, useEffect, useRef, useCallback } from 'react';
import { projectsData } from '../../data/portfolioData';
import { ExternalLink } from '../Common/Icons';
import './Projects.css';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'group', label: 'Group Project' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'scratch', label: 'Scratch' }
];

export default function Projects() {
  const sectionRef = useRef(null);
  const filterBarRef = useRef(null);
  const filterIndicatorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [animateCards, setAnimateCards] = useState(false);

  /* ── Slide the filter pill to the active button ── */
  const updateFilterIndicator = useCallback(() => {
    if (!filterBarRef.current || !filterIndicatorRef.current) return;
    const activeBtn = filterBarRef.current.querySelector('.filter-btn.active');
    if (!activeBtn) {
      filterIndicatorRef.current.style.opacity = '0';
      return;
    }
    const barRect = filterBarRef.current.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    filterIndicatorRef.current.style.opacity = '1';
    filterIndicatorRef.current.style.width = `${btnRect.width}px`;
    filterIndicatorRef.current.style.height = `${btnRect.height}px`;
    filterIndicatorRef.current.style.transform = `translate(${btnRect.left - barRect.left}px, ${btnRect.top - barRect.top}px)`;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimateCards(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Re-position filter indicator when active filter changes or on resize */
  useEffect(() => {
    const id = requestAnimationFrame(updateFilterIndicator);
    window.addEventListener('resize', updateFilterIndicator);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', updateFilterIndicator);
    };
  }, [activeFilter, updateFilterIndicator]);

  const handleFilter = (key) => {
    if (key === activeFilter) return;
    setAnimateCards(false);
    setActiveFilter(key);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimateCards(true);
      });
    });
  };

  const filteredProjects = activeFilter === 'all' ? projectsData : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section className={`projects section ${isVisible ? 'projects-visible' : ''}`} id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            My <span className="gradient-text">Masterpieces</span>
          </h2>
          <p className="section-subtitle">A collection of projects that showcase my skills and passion for development</p>
        </div>

        <div className="projects-filter" ref={filterBarRef}>
          {/* Sliding pill indicator */}
          <span className="filter-indicator" ref={filterIndicatorRef} aria-hidden="true" />
          {filters.map((filter) => (
            <button key={filter.key} className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`} onClick={() => handleFilter(filter.key)}>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className={`project-card ${animateCards ? 'cards-animate' : ''}`} data-category={project.category}>
              <div className="project-card-inner">
                <div className="project-image">
                  <img className="project-placeholder" src={`/${project.icon}`} />
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-links">
                    {project.codeUrl && (
                      <a href={project.codeUrl} className="project-link" aria-label="View source code">
                        <img src="https://imgs.search.brave.com/jaGYDv5_v3IfuWYeri-6yG6ZqVr9aiYk-MiUgZXbmkc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5ncGxheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzEyL0dp/dEh1Yi1CYWNrZ3Jv/dW5kLVBORy5wbmc" alt="" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target='_blank' className="project-link" aria-label="View live demo">
                        <ExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
