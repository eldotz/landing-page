import Orb from "../components/Orb.jsx";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot"></span> INDEPENDENT MINDS.
            EXTRAORDINARY POSSIBILITIES.
          </div>
          <h1 id="hero-title">
            Big ideas.
            <br />
            Real-world
            <br />
            <span className="accent">impact.</span>
            <span className="headline-star" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-description">
            Technology. Creativity. Intelligence.
            <br />
            We bring it all together to move your business forward.
          </p>
          <a className="button button-light" href="#expertise">
            Discover what’s possible{" "}
            <svg>
              <use href="#arrow-up-right" />
            </svg>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-cross cross-top">+</div>
          <div className="art-cross cross-bottom">+</div>
          <div className="orbital-label">
            <span className="mini-line"></span> HUMAN AMBITION.
            <br />
            <span className="orbital-label-indent">INTELLIGENT EXECUTION.</span>
          </div>
          <div className="orb-glow"></div>
          <Orb />
          <div className="orb-coordinate">
            23° 44′ N &nbsp; / &nbsp; ALWAYS FORWARD
          </div>
          <div className="floating-label">
            <span className="floating-icon">
              <svg>
                <use href="#brand-mark" />
              </svg>
            </span>
            <div>
              Built for what’s next.<span>IMAGINE. CREATE. EVOLVE.</span>
            </div>
            <svg className="floating-arrow">
              <use href="#arrow-up-right" />
            </svg>
          </div>
          <div className="orbit-indicator">
            <span></span> CONNECTING THE DOTS
          </div>
        </div>
      </div>
      <div className="hero-foot container">
        <p>YOUR NEXT CHAPTER STARTS HERE.</p>
        <a href="#intro" className="scroll-cue">
          A little further. A lot more possible.<span>↓</span>
        </a>
        <span className="hero-index">01 / 06</span>
      </div>
    </section>
  );
}
