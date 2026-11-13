import { projects } from "../data/projects.js";

export default function Work({ onProjectSelect }) {
  return (
    <section
      className="work section-dark"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="section-label reveal">
              <span className="label-square"></span> POSSIBILITIES, MADE
              TANGIBLE
            </div>
            <h2 className="reveal" id="work-title">
              Good thinking.
              <br />
              <span className="text-muted">Even better doing.</span>
            </h2>
          </div>
          <p className="section-heading-note reveal">
            A glimpse into what we can build together.
            <br />
            Unbranded concepts. Built to show what’s possible.
          </p>
        </div>
        <div className="work-grid">
          <button
            className="project reveal"
            onClick={() => onProjectSelect(projects.commerce)}
            aria-label="Explore commerce experience concept"
          >
            <div className="project-image commerce-scene" aria-hidden="true">
              <div className="project-image-label">
                COMMERCE, WITH A CONSCIENCE.
              </div>
              <div className="commerce-ring"></div>
              <div className="shop-preview">
                <div className="shop-nav">
                  <span className="shop-brand">essentials.</span>
                  <span>
                    Shop &nbsp; Our story &nbsp;{" "}
                    <span className="bag-icon">↗</span>
                  </span>
                </div>
                <div className="shop-main">
                  <div>
                    <span className="shop-eyebrow">LESS, BUT BETTER.</span>
                    <h4>
                      Good for you.
                      <br />
                      Better for
                      <br />
                      <em>the planet.</em>
                    </h4>
                    <span className="shop-button">
                      Discover the collection &nbsp; ↗
                    </span>
                  </div>
                  <div className="bottle-scene">
                    <div className="bottle-shadow"></div>
                    <div className="bottle">
                      <div className="bottle-cap"></div>
                      <span>
                        daily<span>EVERYDAY ESSENTIALS</span>
                        <i>naturally different.</i>
                      </span>
                    </div>
                    <div className="bottle bottle-small">
                      <div className="bottle-cap"></div>
                      <span>
                        care<span>THE GOOD STUFF</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shop-footer">
                  <span>Thoughtfully made. Naturally better.</span>
                  <span>01 — 03</span>
                </div>
              </div>
              <span className="project-open">
                <svg>
                  <use href="#arrow-up-right" />
                </svg>
              </span>
            </div>
            <div className="project-caption">
              <div>
                <h3>Commerce experience</h3>
                <p>A fresh perspective on conscious commerce.</p>
              </div>
              <span>STRATEGY · DESIGN · DEVELOPMENT</span>
            </div>
          </button>
          <button
            className="project reveal"
            onClick={() => onProjectSelect(projects.workspace)}
            aria-label="Explore AI workspace concept"
          >
            <div className="project-image workspace-scene" aria-hidden="true">
              <div className="project-image-label">
                LESS BUSYWORK. MORE BRILLIANCE.
              </div>
              <div className="dashboard-preview">
                <aside className="dash-sidebar">
                  <span className="dash-brand">◉ workspace</span>
                  <div className="dash-search">
                    ⌕ &nbsp; Search anything <kbd>⌘ K</kbd>
                  </div>
                  <span className="dash-nav active">▦ &nbsp; Overview</span>
                  <span className="dash-nav">◫ &nbsp; Workspace</span>
                  <span className="dash-nav">✧ &nbsp; AI assistant</span>
                  <span className="dash-nav">◷ &nbsp; Activity</span>
                  <div className="dash-team">
                    <span>YOUR WORKSPACE</span>
                    <i>● &nbsp; Design team</i>
                    <i>● &nbsp; Development</i>
                    <i>● &nbsp; Marketing</i>
                  </div>
                  <div className="dash-profile">
                    <span>JD</span> Jamie Davis <small>⌄</small>
                  </div>
                </aside>
                <div className="dash-main">
                  <div className="dash-topline">
                    Workspace / Overview <span>↗ &nbsp; ◉</span>
                  </div>
                  <div className="dash-greeting">
                    <div>
                      <h4>
                        A little clarity.
                        <br />A lot of possibility.
                      </h4>
                      <p>Your workspace, working smarter.</p>
                    </div>
                    <span className="dash-spark">✳</span>
                  </div>
                  <div className="dash-stats">
                    <div>
                      <span>Tasks completed</span>
                      <strong>
                        128 <i>↗ 24%</i>
                      </strong>
                      <div className="mini-bars">
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
                    </div>
                    <div>
                      <span>Time reclaimed</span>
                      <strong>
                        32.5 <small>hrs</small>
                      </strong>
                      <div className="dash-wave">
                        <svg viewBox="0 0 140 35">
                          <path d="M0 30C15 30 12 12 28 19S45 30 55 16 70 20 84 9 100 20 111 5 126 9 140 2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ai-prompt">
                    <span>✧</span>
                    <div>
                      <strong>Your next big idea starts here.</strong>
                      <p>Let AI make room for what matters.</p>
                    </div>
                    <b>↑</b>
                  </div>
                  <div className="dash-task">
                    <span>✳ &nbsp; Your day, in focus</span>
                    <small>View all ↗</small>
                    <div>
                      ✓ <span>Website launch checklist</span>
                      <i>In progress</i>
                    </div>
                    <div>
                      ○ <span>Q3 growth strategy</span>
                      <i>Review</i>
                    </div>
                  </div>
                </div>
              </div>
              <span className="project-open">
                <svg>
                  <use href="#arrow-up-right" />
                </svg>
              </span>
            </div>
            <div className="project-caption">
              <div>
                <h3>AI workspace</h3>
                <p>Making space for the work that matters.</p>
              </div>
              <span>PRODUCT · UX / UI · AI</span>
            </div>
          </button>
        </div>
        <p className="work-footnote reveal">
          <span className="status-dot"></span> Illustrative concepts, not client
          projects.
        </p>
      </div>
    </section>
  );
}
