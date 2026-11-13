import { useState } from "react";

// Replace this address with your monitored business inbox before launch.
const CONTACT_EMAIL = "hello@eldotz.com";

export default function ContactForm({ service, onServiceChange }) {
  const [prepared, setPrepared] = useState(false);
  const [mailUrl, setMailUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();
    if (!message) {
      const input = event.currentTarget.elements.message;
      input.setCustomValidity("Tell us a little about your idea.");
      input.reportValidity();
      return;
    }
    if (!name || !email) return;
    const subject = `Let’s connect — ${data.get("service") || "A new possibility"}`;
    const body = `Hi Eldotz,\n\n${message}\n\nName: ${name}\nEmail: ${email}\nInterested in: ${data.get("service") || "Let’s figure it out together"}`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailUrl(url);
    setPrepared(true);
    window.location.href = url;
  }

  return (
    <form
      className="contact-form reveal"
      id="contact-form"
      onSubmit={handleSubmit}
    >
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">
            Your name <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            maxLength={120}
            pattern=".*\S.*"
            title="Enter your name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="email">
            Work email <span>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            maxLength={254}
            required
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="service">What are you thinking?</label>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(event) => onServiceChange(event.target.value)}
        >
          <option value="">Select a starting point</option>
          <option>IT services</option>
          <option>Marketing &amp; growth</option>
          <option>Product development</option>
          <option>AI solutions</option>
          <option>A little bit of everything</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">
          A little about your idea <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="The ambition. The challenge. The ‘what if.’"
          rows={3}
          maxLength={5000}
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          required
        />
      </div>
      <div className="form-submit">
        <p>
          Opens your email app.
          <br />
          No mailing lists. No noise.
        </p>
        <button className="button button-dark" type="submit">
          Start a conversation{" "}
          <svg>
            <use href="#arrow-up-right" />
          </svg>
        </button>
      </div>
      <p className="form-status" role="status" aria-live="polite">
        {prepared && (
          <>
            Your email draft is ready — it has not been sent yet.{" "}
            <a href={mailUrl}>Open it again</a>, or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </>
        )}
      </p>
    </form>
  );
}
