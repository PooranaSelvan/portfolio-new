import { useState, useEffect, useRef } from 'react';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import { Mail, Send, IdBadge, MapPin, getSocialIcon } from '../Common/Icons';
import './Contact.css';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);

    let form = new FormData(e.target);

    form.append("access_key", import.meta.env.VITE_FORM_KEY);

    try {
      let res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });

      let data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: "Message sent successfully!",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);

      // Hide status after 5 seconds
      setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section className={`contact section ${isVisible ? 'contact-visible' : ''}`} id="contact" ref={sectionRef}>

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Eager to Learn <span className="gradient-text">Together</span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <Mail />
              </div>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <IdBadge />
              </div>
              <div>
                <h4>EMP ID</h4>
                <p>#zsttk424</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin />
              </div>
              <div>
                <h4>Location</h4>
                <p>Tenkasi, Tamilnadu</p>
              </div>
            </div>

            <div className="contact-socials">
              {socialLinks.map((link) => {
                const Icon = getSocialIcon(link.icon);
                return (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label={link.name}>
                    <Icon size={20} />
                    <span className="contact-social-tooltip">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-wrapper">
                  <input type="text" id="name" name="name" required placeholder=" " value={formData.name} onChange={handleChange} />
                  <label htmlFor="name">Your Name</label>
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <input type="email" id="email" name="email" required placeholder=" " value={formData.email} onChange={handleChange} />
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div className="form-group">
                <div className="input-wrapper">
                  <textarea id="message" name="message" rows="5" required placeholder=" " value={formData.message} onChange={handleChange}></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Saying Hello...' : 'Say Hello'}</span>
                <Send />
              </button>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
