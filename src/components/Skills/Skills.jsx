import { skillsData } from '../../data/portfolioData';
import { Code, Server, Wrench } from '../Common/Icons';
import './Skills.css';

const categoryIcons = {
  frontend: <Code size={24} />,
  backend: <Server size={24} />,
  tools: <Wrench size={24} />,
};

export default function Skills() {
  

  return (
    <section className="skills section" id="skills">
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Skills
          </h2>
        </div>

        <div className="skills-categories">
          {skillsData.map((category, catIndex) => (
            <div key={catIndex} className="skill-category">
              <div className="category-header">
                <div className={`category-icon ${category.iconType}`}>
                  {categoryIcons[category.iconType]}
                </div>
                <h3 className="category-title">{category.category}</h3>
              </div>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <div className="skill-card" key={skillIndex}>
                    <div className="skill-icon">
                      <img src={skill.icon} />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
