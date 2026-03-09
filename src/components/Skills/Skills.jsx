import { useState, useEffect, useRef, useCallback } from 'react';
import { skillsData } from '../../data/portfolioData';
import { Code, Server, Wrench, ChevronLeft, ChevronRight } from '../Common/Icons';
import './Skills.css';

const categoryIcons = {
  frontend: <Code size={24} />,
  backend: <Server size={24} />,
  tools: <Wrench size={24} />,
};

const ITEMS_PER_PAGE = 5;

function PaginatedSkillsGrid({ skills, isVisible }) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(skills.length / ITEMS_PER_PAGE);
  const startIdx = currentPage * ITEMS_PER_PAGE;
  const visibleSkills = skills.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  return (
    <div className="paginated-skills">
      <div className="paginated-skills-viewport">
        <button
          className={`paginate-arrow paginate-arrow-left ${currentPage === 0 ? 'paginate-arrow-disabled' : ''}`}
          onClick={goToPrev}
          disabled={currentPage === 0}
          aria-label="Previous tools"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="skills-grid skills-grid-paginated" key={currentPage}>
          {visibleSkills.map((skill, skillIndex) => (
            <div
              className={`skill-card ${isVisible ? 'skill-card-paginated-visible' : ''}`}
              key={`${currentPage}-${skillIndex}`}
              style={{ animationDelay: `${skillIndex * 0.07}s` }}
            >
              <div className="skill-icon">
                <img src={skill.icon} alt={skill.name} loading="lazy" />
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>

        <button
          className={`paginate-arrow paginate-arrow-right ${currentPage === totalPages - 1 ? 'paginate-arrow-disabled' : ''}`}
          onClick={goToNext}
          disabled={currentPage === totalPages - 1}
          aria-label="Next tools"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="paginate-indicators">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`paginate-dot ${i === currentPage ? 'paginate-dot-active' : ''}`}
            onClick={() => setCurrentPage(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`skills section ${isVisible ? 'skills-visible' : ''}`} id="skills" ref={sectionRef}>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            My Skills That <span className='gradient-text'>Drive Results</span>
          </h2>
          <p className="section-subtitle">Technologies and tools I work with to bring ideas to life</p>
        </div>

        <div className="skills-categories">
          {skillsData.map((category, catIndex) => (
            <div key={catIndex} className="skill-category">
              <div className="category-header">
                <div className={`category-icon ${category.iconType}`}>
                  {categoryIcons[category.iconType]}
                </div>
                <div>
                  <h3 className="category-title">{category.category}</h3>
                  <p className="category-count">{category.skills.length} technologies</p>
                </div>
              </div>

              {category.iconType === 'tools' ? (
                <PaginatedSkillsGrid
                  skills={category.skills}
                  isVisible={isVisible}
                  catIndex={catIndex}
                />
              ) : (
                <div className="skills-grid">
                  {category.skills.map((skill, skillIndex) => (
                    <div className="skill-card" key={skillIndex}>
                      <div className="skill-icon">
                        <img src={skill.icon} alt={skill.name} loading="lazy" />
                      </div>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
