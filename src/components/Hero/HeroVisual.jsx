import my from "/my.png";


export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-image-wrapper">
        <div className="hero-image-container">
          <div className="orbit-ring orbit-ring-3"></div>

          <div className="hero-avatar">
            <img className="my-image" src={my} alt="" />
          </div>
        </div>

        {/* <div className="floating-card card-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Full Stack Dev</span>
        </div>

        <div className="floating-card card-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>UI/UX Design</span>
        </div>

        <div className="floating-card card-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span>Clean Code</span>
        </div> */}
      </div>
    </div>
  );
}
