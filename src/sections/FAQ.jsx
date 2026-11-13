export default function FAQ() {
  return (
    <section className="faq section-dark" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div>
          <div className="section-label reveal">
            <span className="label-square"></span> A FEW GOOD QUESTIONS
          </div>
          <h2 className="reveal" id="faq-title">
            Good to know.
            <br />
            <span className="text-muted">Before we say hello.</span>
          </h2>
        </div>
        <div className="faq-list reveal">
          <details>
            <summary>
              Who do you work with?
              <svg>
                <use href="#plus" />
              </svg>
            </summary>
            <p>
              Ambitious startups, growing businesses, and established teams
              ready for their next chapter. Whether you need a focused solution
              or a full digital transformation, we’ll find the right way forward
              together.
            </p>
          </details>
          <details>
            <summary>
              Can we start with just one service?
              <svg>
                <use href="#plus" />
              </svg>
            </summary>
            <p>
              Absolutely. Start with what you need today — a website, a growth
              campaign, a product, or an AI workflow. Our services work
              independently and become even more powerful when connected.
            </p>
          </details>
          <details>
            <summary>
              What does a typical project look like?
              <svg>
                <use href="#plus" />
              </svg>
            </summary>
            <p>
              We start with a conversation, then define the scope, timeline, and
              investment together. You’ll get a clear roadmap, direct access to
              your team, and regular progress updates. No surprises.
            </p>
          </details>
          <details>
            <summary>
              How do we get started?
              <svg>
                <use href="#plus" />
              </svg>
            </summary>
            <p>
              Tell us a little about your idea using the form below. We’ll
              arrange an introductory conversation to understand what you need
              and explore how we can help. No pressure, no commitment.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
