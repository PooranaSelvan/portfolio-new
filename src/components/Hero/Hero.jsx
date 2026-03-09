import { heroData, personalInfo, socialLinks } from '../../data/portfolioData';
import { ArrowRight, getSocialIcon } from '../Common/Icons';
import Highlighter from '../Common/Highlighter';
import HeroVisual from './HeroVisual';
import './Hero.css';

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function generateParticles(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: i,
      left: randomBetween(0, 100),
      top: randomBetween(0, 100),
      size: randomBetween(1.5, 4),
      opacity: randomBetween(0.12, 0.37),
      duration: randomBetween(12, 30),
      delay: -randomBetween(0, 20),
      driftX: randomBetween(-30, 30),
      driftY: randomBetween(-40, 40),
    });
  }
  return result;
}

// Generate fewer particles for mobile devices for better performance
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
const PARTICLE_COUNT = isMobile ? 80 : 300;
const particles = generateParticles(PARTICLE_COUNT);

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

          <div className="hero-socials">
            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link.icon);
              return (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label={link.name}>
                  <Icon size={20} />
                  <span className="hero-social-tooltip">{link.name}</span>
                </a>
              );
            })}
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
