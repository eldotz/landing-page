export default function About() {
  return (
    <section
      className="about section-light"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="container about-grid">
        <div className="about-art reveal" aria-hidden="true">
          <div className="about-grid-lines"></div>
          <div className="about-circle circle-a"></div>
          <div className="about-circle circle-b"></div>
          <div className="about-center">
            <svg>
              <use href="#brand-mark" />
            </svg>
          </div>
          <span className="about-art-top">DIFFERENT MINDS.</span>
          <span className="about-art-bottom">ONE SHARED AMBITION. ↗</span>
          <span className="about-coord">E / 01</span>
        </div>
        <div className="about-copy">
          <div className="section-label reveal">
            <span className="label-square"></span> A LITTLE ABOUT US
          </div>
          <h2 className="reveal" id="about-title">
            Small by choice.
            <br />
            <span className="text-muted">Big on possibility.</span>
          </h2>
          <p className="reveal">
            We’re eldotz. A connected team of builders, thinkers, and
            problem-solvers who believe the best work happens when different
            perspectives come together.
          </p>
          <p className="reveal">
            We combine the care of a close-knit team with the capability to take
            on your biggest challenges. No layers. No hand-offs. Just the right
            people, working directly with you.
          </p>
          <div className="about-values reveal">
            <span>
              <i>↗</i> Built on curiosity
            </span>
            <span>
              <i>↗</i> Driven by purpose
            </span>
            <span>
              <i>↗</i> Better, together
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
