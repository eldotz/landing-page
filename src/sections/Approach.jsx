export default function Approach() {
  return (
    <section
      className="approach section-dark"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="container approach-grid">
        <div className="approach-intro">
          <div className="section-label reveal">
            <span className="label-square"></span> HOW WE GET THERE
          </div>
          <h2 className="reveal" id="approach-title">
            No black boxes.
            <br />
            No big egos.
            <br />
            <span className="text-muted">Just good work.</span>
          </h2>
          <p className="reveal">
            A clear process. An open conversation.
            <br />
            And a team that’s as invested as you are.
          </p>
          <div className="approach-mark reveal" aria-hidden="true">
            <svg>
              <use href="#brand-mark" />
            </svg>
            <span>
              CONNECTED THINKING.
              <br />
              MEANINGFUL OUTCOMES.
            </span>
          </div>
        </div>
        <div className="steps">
          <article className="step reveal">
            <span className="step-number">01</span>
            <div>
              <h3>First, we listen.</h3>
              <p>
                Your goals, your challenges, your wildest “what if.” We get to
                know your world before we try to change it.
              </p>
              <span className="step-tag">DISCOVER & DEFINE</span>
            </div>
            <span className="step-dot"></span>
          </article>
          <article className="step reveal">
            <span className="step-number">02</span>
            <div>
              <h3>Then, we connect the dots.</h3>
              <p>
                The right strategy meets the right ideas. Together, we shape a
                clear roadmap from possibility to a plan.
              </p>
              <span className="step-tag">STRATEGIZE & DESIGN</span>
            </div>
            <span className="step-dot"></span>
          </article>
          <article className="step reveal">
            <span className="step-number">03</span>
            <div>
              <h3>We make it real.</h3>
              <p>
                Designers, engineers, and strategists, building side by side.
                Every detail considered. Every decision intentional.
              </p>
              <span className="step-tag">BUILD & LAUNCH</span>
            </div>
            <span className="step-dot"></span>
          </article>
          <article className="step reveal">
            <span className="step-number">04</span>
            <div>
              <h3>And keep moving forward.</h3>
              <p>
                Launch is a beginning, not a finish line. We measure, learn, and
                evolve to make what’s good even better.
              </p>
              <span className="step-tag">MEASURE & EVOLVE</span>
            </div>
            <span className="step-dot"></span>
          </article>
        </div>
      </div>
    </section>
  );
}
