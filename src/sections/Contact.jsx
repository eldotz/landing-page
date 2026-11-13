import ContactForm from "../components/ContactForm.jsx";

export default function Contact({ service, onServiceChange }) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="section-label reveal">
            <span className="label-square"></span> WHAT’S YOUR NEXT?
          </div>
          <h2 className="reveal" id="contact-title">
            A big idea?
            <br />A tricky challenge?
            <br />
            <span>Let’s talk.</span>
            <svg aria-hidden="true">
              <use href="#arrow-up-right" />
            </svg>
          </h2>
          <p className="reveal">
            You don’t need to have it all figured out.
            <br />
            That’s what we’re here for.
          </p>
          <div className="contact-note reveal">
            <span className="status-dot"></span> GOOD CONVERSATIONS. GREAT
            POSSIBILITIES.
          </div>
        </div>
        <ContactForm service={service} onServiceChange={onServiceChange} />
      </div>
    </section>
  );
}
