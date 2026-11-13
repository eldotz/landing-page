export default function Footer({ menuOpen, onPrivacyOpen }) {
  return (
    <footer className="footer section-dark" inert={menuOpen}>
      <div className="container">
        <div className="footer-top">
          <a className="brand" href="#top" aria-label="Eldotz home">
            <svg className="brand-mark" aria-hidden="true">
              <use href="#brand-mark" />
            </svg>
            <span>
              eldotz<span className="brand-period">.</span>
            </span>
          </a>
          <p>
            Different disciplines.
            <br />
            One extraordinary direction.
          </p>
          <a className="back-to-top" href="#top">
            BACK TO TOP{" "}
            <svg>
              <use href="#arrow-up-right" />
            </svg>
          </a>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          connecting the dots<span>↗</span>
        </div>
        <div className="footer-bottom">
          <span>
            © <span>{new Date().getFullYear()}</span> Eldotz. All rights
            reserved.
          </span>
          <span>THOUGHTFULLY BUILT. ALWAYS EVOLVING.</span>
          <button className="privacy-link" onClick={onPrivacyOpen}>
            Privacy notice{" "}
            <svg>
              <use href="#arrow-up-right" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
