import { heroData, personalInfo } from '../../data/portfolioData';
import { ArrowRight } from '../Common/Icons';
import Highlighter from '../Common/Highlighter';
import HeroVisual from './HeroVisual';
import './Hero.css';

const PARTICLE_COUNT = 300;
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
const particles = [];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    id: i,

    // Random position on screen (0% to 100%)
    left: randomBetween(0, 100),
    top: randomBetween(0, 100),

    // Random dot size (small: 1.5px → large: 4px)
    size: randomBetween(1.5, 4),

    // Random transparency (subtle: 0.12 → slightly visible: 0.37)
    opacity: randomBetween(0.12, 0.37),

    // How long one full float cycle takes (slow: 12s → very slow: 30s)
    duration: randomBetween(12, 30),

    // Negative delay so all particles start at different points
    // in their animation — prevents them from moving in sync
    delay: -randomBetween(0, 20),

    // How far the particle drifts horizontally and vertically
    driftX: randomBetween(-30, 30),
    driftY: randomBetween(-40, 40),
  });
}

export default function Hero() {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-particles" aria-hidden="true">
        {particles.map((p) => (
          <span key={p.id} className="hero-particle"
            style={{
              // Position the dot on screen
              left: `${p.left}%`,
              top: `${p.top}%`,
              '--p-size': `${p.size}px`,
              '--p-opacity': p.opacity,
              '--p-duration': `${p.duration}s`,
              '--p-delay': `${p.delay}s`,
              '--p-drift-x': `${p.driftX}px`,
              '--p-drift-y': `${p.driftY}px`,
            }}
          />
        ))}
      </div>

      <div className="hero-container container">
        <div className="hero-content">

          <h1 className="hero-title">
            <span className="title-line">{heroData.greeting}</span> <br />
            <Highlighter color="var(--clr-primary)" strokeWidth={3} delay={900}>
              <span className="gradient-text">{personalInfo.name}</span>
            </Highlighter>
          </h1>

          <p className="hero-subtitle">{personalInfo.title}</p>

          <p className="hero-description">{heroData.description}</p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={(e) => handleNavClick(e, 'projects')}>
              <span>My Works</span>
              <ArrowRight />
            </button>
            <button className="btn btn-outline" onClick={(e) => handleNavClick(e, 'contact')}>
              <span>Connect with me</span>
            </button>
          </div>
        </div>

        <HeroVisual />
      </div>

      <div className="hero-scroll">
        <button href="#skills" className="scroll-indicator" onClick={(e) => handleNavClick(e, 'skills')}>
          <span>Scroll Down</span>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </button>
      </div>
    </section>
  );
}
