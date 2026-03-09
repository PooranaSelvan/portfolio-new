import my from "/my.png";

export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-image-wrapper">
        <div className="hero-image-container">
          <div className="orbit-ring orbit-ring-3"></div>

          <div className="hero-avatar">
            <img className="my-image" src={my} alt="Poorana Selvan" />
          </div>
        </div>

        
      </div>
    </div>
  );
}
