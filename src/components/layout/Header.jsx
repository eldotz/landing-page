import ButtonArrow from "../ButtonArrow.jsx";

export default function Header({ menuOpen, onMenuChange, isBlog = false }) {
  const home = isBlog ? "/" : "#top";
  const section = (id) => (isBlog ? `/#${id}` : `#${id}`);
  return (
    <header className={`header${menuOpen ? " menu-open" : ""}`} id="top">
      <div className="nav-wrap container">
        <a className="brand" href={home} aria-label="Eldotz home">
          <svg className="brand-mark" aria-hidden="true">
            <use href="#brand-mark" />
          </svg>
          <span>
            eldotz<span className="brand-period">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href={section("expertise")}>Expertise</a>
          <a href={section("work")}>Solutions lab</a>
          <a href={section("approach")}>Our approach</a>
          <a href={section("about")}>About us</a>
          <a className={isBlog ? "nav-active" : ""} href="/blog">Notes</a>
        </nav>
        <a className="nav-contact" href={section("contact")}>
          <span className="button-label">Let’s talk</span>
          <ButtonArrow />
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
        <a href={section("expertise")}>
          Expertise <span>01</span>
        </a>
        <a href={section("work")}>
          Solutions lab <span>02</span>
        </a>
        <a href={section("approach")}>
          Our approach <span>03</span>
        </a>
        <a href={section("about")}>
          About us <span>04</span>
        </a>
        <a href="/blog">
          Notes <span>05</span>
        </a>
        <a href={section("contact")}>
          Let’s talk{" "}
          <svg>
            <use href="#arrow-up-right" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
