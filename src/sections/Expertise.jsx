export default function Expertise({ onServiceSelect }) {
  return (
    <section
      className="expertise section-light"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-label reveal">
              <span className="label-square"></span> OUR EXPERTISE
            </div>
            <h2 className="reveal" id="expertise-title">
              A bigger picture.
              <br />
              <span className="text-muted">Every piece, connected.</span>
            </h2>
          </div>
          <p className="section-heading-note reveal">
            From the first spark to your next big leap.
            <br />
            Everything you need. One team that gets it.
          </p>
        </div>
        <div className="services-grid">
          <a
            className="service-card reveal"
            id="it-services"
            href="#contact"
            onClick={() => onServiceSelect("IT services")}
          >
            <div className="service-top">
              <span className="service-number">01</span>
              <svg className="service-arrow">
                <use href="#arrow-up-right" />
              </svg>
            </div>
            <div className="service-art art-tech" aria-hidden="true">
              <div className="tech-bracket">[</div>
              <div className="tech-core">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="tech-bracket">]</div>
            </div>
            <h3>
              IT services.
              <br />
              Built to scale.
            </h3>
            <p>
              Resilient software, seamless experiences, and infrastructure that
              scales with your ambition.
            </p>
            <div className="service-tags">
              <span>IT SERVICES</span>
              <span>WEB & APP DEVELOPMENT</span>
            </div>
          </a>
          <a
            className="service-card reveal"
            id="digital-marketing"
            href="#contact"
            onClick={() => onServiceSelect("Marketing & growth")}
          >
            <div className="service-top">
              <span className="service-number">02</span>
              <svg className="service-arrow">
                <use href="#arrow-up-right" />
              </svg>
            </div>
            <div className="service-art art-growth" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <svg viewBox="0 0 160 90">
                <path d="m8 74 38-25 31 8 58-48M111 9h24v24" />
              </svg>
            </div>
            <h3>
              Digital marketing.
              <br />
              Designed to grow.
            </h3>
            <p>
              Brand stories that resonate. Digital campaigns that convert.
              Growth you can actually measure.
            </p>
            <div className="service-tags">
              <span>DIGITAL MARKETING</span>
              <span>BRAND STRATEGY</span>
            </div>
          </a>
          <a
            className="service-card reveal"
            id="product-development"
            href="#contact"
            onClick={() => onServiceSelect("Product development")}
          >
            <div className="service-top">
              <span className="service-number">03</span>
              <svg className="service-arrow">
                <use href="#arrow-up-right" />
              </svg>
            </div>
            <div className="service-art art-product" aria-hidden="true">
              <div className="product-window window-back"></div>
              <div className="product-window window-front">
                <div className="window-dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="window-layout">
                  <span></span>
                  <div>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
              </div>
            </div>
            <h3>
              Product development.
              <br />
              From idea to impact.
            </h3>
            <p>
              Thoughtfully designed digital products. Built around your users,
              engineered for the real world.
            </p>
            <div className="service-tags">
              <span>PRODUCT DEVELOPMENT</span>
              <span>UI / UX DESIGN</span>
            </div>
          </a>
          <a
            className="service-card reveal"
            id="ai-solutions"
            href="#contact"
            onClick={() => onServiceSelect("AI solutions")}
          >
            <div className="service-top">
              <span className="service-number">04</span>
              <svg className="service-arrow">
                <use href="#arrow-up-right" />
              </svg>
            </div>
            <div className="service-art art-ai" aria-hidden="true">
              <span className="ai-orbit orbit-one"></span>
              <span className="ai-orbit orbit-two"></span>
              <span className="ai-orbit orbit-three"></span>
              <span className="ai-core">✳</span>
              <i className="ai-node node-one"></i>
              <i className="ai-node node-two"></i>
            </div>
            <h3>
              AI solutions.
              <br />
              Real-world intelligence.
            </h3>
            <p>
              Practical AI that solves real challenges. Automate the ordinary.
              Unlock the extraordinary.
            </p>
            <div className="service-tags">
              <span>AI SOLUTIONS</span>
              <span>SMART AUTOMATION</span>
            </div>
          </a>
        </div>
        <div className="expertise-footer reveal">
          <span>A single challenge. Or the whole journey.</span>
          <a className="text-link" href="#contact">
            Let’s find your starting point{" "}
            <svg>
              <use href="#arrow-up-right" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
