export default function Header({ menuOpen, onMenuChange }) {
  return (
    <header className={`header${menuOpen ? " menu-open" : ""}`} id="top">
      <div className="nav-wrap container">
        <a className="brand" href="#top" aria-label="Eldotz home">
          <svg className="brand-mark">
            <use href="#brand-mark" />
          </svg>
          <span>
            eldotz<span className="brand-period">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#expertise">Expertise</a>
          <a href="#work">Selected work</a>
          <a href="#approach">Our approach</a>
          <a href="#about">About us</a>
        </nav>
        <a className="nav-contact" href="#contact">
          Let’s talk{" "}
          <svg>
            <use href="#arrow-up-right" />
          </svg>
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => onMenuChange(!menuOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <nav
        className="mobile-nav"
        id="mobile-nav"
        aria-label="Mobile navigation"
        inert={!menuOpen}
        onClick={() => onMenuChange(false)}
      >
        <a href="#expertise">
          Expertise <span>01</span>
        </a>
        <a href="#work">
          Selected work <span>02</span>
        </a>
        <a href="#approach">
          Our approach <span>03</span>
        </a>
        <a href="#about">
          About us <span>04</span>
        </a>
        <a href="#contact">
          Let’s talk{" "}
          <svg>
            <use href="#arrow-up-right" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
