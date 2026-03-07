import { useState } from 'react';
import { projectsData } from '../../data/portfolioData';
import { ExternalLink, Code } from '../Common/Icons';
import './Projects.css';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'group', label: 'Group Project' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all' ? projectsData : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Projects
          </h2>
        </div>

        <div className="projects-filter">
          {filters.map((filter) => (
            <button key={filter.key} className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`} onClick={() => setActiveFilter(filter.key)}>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card" data-category={project.category}>
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
