export default function Intro() {
  return (
    <section
      className="intro section-dark"
      id="intro"
      aria-labelledby="intro-title"
    >
      <div className="container intro-grid">
        <div className="section-label reveal">
          <span className="small-star">✳</span> THE BIG PICTURE
        </div>
        <div>
          <h2 className="intro-statement reveal" id="intro-title">
            The future doesn’t
            <br />
            build itself.{" "}
            <span>
              We help
              <br />
              you build it.
            </span>
          </h2>
          <div className="intro-bottom reveal">
            <p>
              Great businesses aren’t built in silos. Neither are we. We’re your
              technology team, creative thinkers, and growth partners — working
              as one to turn what’s next into what’s now.
            </p>
            <a className="text-link" href="#about">
              Meet your unfair advantage{" "}
              <svg>
                <use href="#arrow-up-right" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="capability-strip" aria-label="Our capabilities">
        <div className="container">
          <span>STRATEGY</span>
          <span className="strip-star">✳</span>
          <span>DESIGN</span>
          <span className="strip-star">✳</span>
          <span>TECHNOLOGY</span>
          <span className="strip-star">✳</span>
          <span>GROWTH</span>
          <span className="strip-star">✳</span>
          <span>INTELLIGENCE</span>
        </div>
      </div>
    </section>
  );
}
