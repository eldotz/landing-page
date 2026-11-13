import { faqs } from "../data/faqs.js";

export default function FAQ() {
  return (
    <section className="faq section-dark" id="faq" aria-labelledby="faq-title">
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
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <svg aria-hidden="true">
                  <use href="#plus" />
                </svg>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
