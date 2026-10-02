import { useState } from 'react';
import './App.css';
import ContactModal from './components/ContactModal';

/*
  ============================================================================
  AI POWER — Single Page Landing Page
  ============================================================================

  A BEGINNER'S GUIDE TO THE STRUCTURE OF THIS FILE:

  1. DATA (all-caps arrays at the top)
     We keep the text OUTSIDE of the HTML. If you want to change a feature
     name later, you change it in one place instead of hunting through markup.

  2. COMPONENTS (functions that start with a Capital letter)
     A component is just a function that RETURNS JSX (the HTML-like syntax).
     Each component here renders ONE section of the page.

  3. THE PARENT COMPONENT (App)
     App is the top-level component. It simply places every section in the
     correct order. index.js already renders <App /> for us.

  WHY SPLIT IT UP?
  If everything was in one giant return block, a typo in the footer would be
  hard to find. Separate components = easier to read, test and reuse.

  THE COMPONENTS IN THIS FILE:
    Navbar         -> top bar, logo and menu
    Hero           -> the big headline at the very top
    Features       -> the section that holds the 3 cards
    FeatureCard    -> ONE single card (reused 3 times with different data)
    About          -> explains what AI is
    CallToAction   -> the "Ready to Explore AI?" block
    Footer         -> bottom of the page
    SectionHeading -> small reusable title + subtitle block
*/

/* ==========================================================================
   SECTION 1 — DATA
   Components read from here. Changing text = changing only this part.
   ========================================================================== */

// The menu links in the navbar. 'href' is the id of a section further down,
// so clicking a link jumps to that part of the page.
const MENU_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// The 3 feature cards. Each object becomes one <FeatureCard />.
const FEATURES = [
  {
    icon: 'automation',
    title: 'Automation',
    description: 'AI reduces repetitive work and improves productivity.',
  },
  {
    icon: 'decisions',
    title: 'Smart Decisions',
    description: 'AI analyzes data and helps people make better decisions.',
  },
  {
    icon: 'future',
    title: 'Future Technology',
    description: 'AI creates innovative solutions across industries.',
  },
];

// The 3 explanation blocks inside the About section.
const ABOUT_POINTS = [
  {
    title: 'What is AI?',
    description:
      'Artificial Intelligence is software that can do things which normally need human thinking — such as understanding language, recognising images and learning from examples.',
  },
  {
    title: 'Why AI is powerful?',
    description:
      'AI learns from huge amounts of data very quickly. It works 24 hours a day without getting tired, handles large volumes of information, and spots patterns that people would easily miss.',
  },
  {
    title: 'How AI changes the future?',
    description:
      'AI is already used in healthcare, education, banking and transport. It saves people time, helps companies make better choices, and opens new jobs and ideas we cannot imagine yet.',
  },
];

// Small numbers shown under the hero text.
const HERO_STATS = [
  { value: '24/7', label: 'Always working' },
  { value: '100x', label: 'Faster analysis' },
  { value: '0 errors', label: 'Fewer mistakes' },
];

// Inline SVG paths for the feature icons. Using SVG means we do not have to
// install any icon library — everything stays inside this one file.
const ICONS = {
  // A lightning bolt = speed and automation
  automation: (
    <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
  ),
  // Bar chart = analysing data and making decisions
  decisions: (
    <>
      <path d="M4 20V11" />
      <path d="M10 20V4" />
      <path d="M16 20v-6" />
      <path d="M2 20h20" />
    </>
  ),
  // Sparkle star = new ideas and innovation
  future: (
    <>
      <path d="M12 3l1.9 5.2L19 10l-5.1 1.8L12 17l-1.9-5.2L5 10l5.1-1.8L12 3Z" />
      <path d="M18 15.5l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z" />
    </>
  ),
};

/* ==========================================================================
   SECTION 2 — SMALL REUSABLE COMPONENTS
   ========================================================================== */

// Reusable heading block used by the Features, About and CTA sections.
function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="section-heading">
      {/* A small label above the title */}
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}

// ONE card. We call it 3 times inside <Features /> with different data.
// This is the most useful React idea on the page: build once, reuse many times.
function FeatureCard({ icon, title, description }) {
  return (
    <article className="card">
      {/* Rounded square holding the icon */}
      <div className="card__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[icon]}
        </svg>
      </div>

      <h3 className="card__title">{title}</h3>
      <p className="card__text">{description}</p>
    </article>
  );
}

/* ==========================================================================
   SECTION 3 — PAGE SECTIONS
   ========================================================================== */

// --- 3.1 NAVBAR -----------------------------------------------------------
function Navbar() {
  /*
    useState creates a piece of "changing" data.
    Syntax: const [value, setValue] = useState(startingValue);

    Here the starting value is `false` because the mobile menu starts closed.
    When `menuOpen` becomes true we add the class "is-open", and CSS does the rest.
  */
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#home" className="logo">
          <span className="logo__mark">AI</span>
          <span className="logo__text">AI Power</span>
        </a>

        {/* Hamburger button — only visible on small screens (see App.css) */}
        <button
          type="button"
          className={`navbar__toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>

        {/* The menu itself */}
        <nav
          className={`navbar__menu${menuOpen ? ' is-open' : ''}`}
          aria-label="Main navigation"
        >
          {MENU_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              // Close the mobile menu after the user picks a link
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="btn btn--primary btn--small navbar__cta"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}

// --- 3.2 HERO -------------------------------------------------------------
function Hero({ onLearnMore }) {
  return (
    <section id="home" className="hero">
      {/* Decorative blurred circles behind the text */}
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        {/* LEFT side: the text */}
        <div className="hero__content">
          <p className="badge">
            <span className="badge__dot" />
            AI is changing the way we work
          </p>

          <h1 className="hero__title">
            Unlock the Power of{' '}
            <span className="gradient-text">Artificial Intelligence</span>
          </h1>

          <p className="hero__text">
            Artificial Intelligence helps businesses and people automate tasks,
            analyze information faster, and create smarter solutions for the
            future.
          </p>

          <div className="hero__actions">
            <a href="#features" className="btn btn--primary">
              Explore AI
            </a>
            <button type="button" className="btn btn--ghost" onClick={onLearnMore}>
              Learn more
            </button>
          </div>

          <ul className="hero__stats">
            {HERO_STATS.map((stat) => (
              <li key={stat.label} className="hero__stat">
                <strong className="hero__stat-value">{stat.value}</strong>
                <span className="hero__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT side: a decorative "AI dashboard" card. Hidden on mobile. */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card">
            <div className="hero__card-head">
              <span className="hero__dot" />
              <span className="hero__dot" />
              <span className="hero__dot" />
            </div>

            <p className="hero__card-title">AI Model Live</p>

            {/* Animated bars, made with pure CSS */}
            <div className="hero__bars">
              <span style={{ height: '42%' }} />
              <span style={{ height: '68%' }} />
              <span style={{ height: '54%' }} />
              <span style={{ height: '86%' }} />
              <span style={{ height: '64%' }} />
              <span style={{ height: '96%' }} />
            </div>

            <div className="hero__card-foot">
              <span>Accuracy</span>
              <strong>99.4%</strong>
            </div>
          </div>

          {/* A small floating chip that gently bobs up and down */}
          <div className="hero__chip">
            <span className="hero__chip-icon">✓</span>
            Automation active
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 3.3 FEATURES ---------------------------------------------------------
function Features() {
  return (
    <section id="features" className="section features">
      <div className="container">
        <SectionHeading
          eyebrow="Features"
          title="What AI Can Do For You"
          subtitle="Three simple ideas that explain why artificial intelligence is useful today."
        />

        <div className="features__grid">
          {/* .map() turns the FEATURES array into 3 <FeatureCard /> elements */}
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 3.4 ABOUT ------------------------------------------------------------
function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Understanding Artificial Intelligence"
          subtitle="No complicated words — here is AI explained in plain English."
        />

        <div className="about__grid">
          {ABOUT_POINTS.map((point, index) => (
            <article key={point.title} className="about__item">
              {/* index is 0, 1, 2 — we add 1 to show 01, 02, 03 */}
              <span className="about__number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="about__title">{point.title}</h3>
              <p className="about__text">{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- 3.5 CALL TO ACTION ---------------------------------------------------
function CallToAction() {
  return (
    <section id="contact" className="section cta">
      <div className="container">
        <div className="cta__box">
          <div className="cta__glow" aria-hidden="true" />

          <h2 className="cta__title">Ready to Explore AI?</h2>
          <p className="cta__text">
            Start learning today and discover how artificial intelligence can
            help you work faster and smarter.
          </p>

          <a href="#home" className="btn btn--primary btn--large">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

// --- 3.6 FOOTER -----------------------------------------------------------
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="logo">
            <span className="logo__mark">AI</span>
            <span className="logo__text">AI Power</span>
          </a>
          <p className="footer__tagline">
            Simple answers about artificial intelligence.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          {MENU_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer__bottom">
        {/* new Date().getFullYear() always returns the current year */}
        <p>&copy; {new Date().getFullYear()} AI Power. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ==========================================================================
   SECTION 4 — THE PARENT COMPONENT
   App puts all the sections together, in the correct order.
   ========================================================================== */
function App() {
  // Controls whether the contact modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="page">
      <Navbar />

      {/* <main> holds the main content of the page (good for accessibility + SEO) */}
      <main>
        {/* onLearnMore opens the contact modal instead of navigating away */}
        <Hero onLearnMore={() => setIsModalOpen(true)} />
        <Features />
        <About />
        <CallToAction />
      </main>

      <Footer />

      {/* Contact modal — rendered at the end so it sits on top of everything */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;