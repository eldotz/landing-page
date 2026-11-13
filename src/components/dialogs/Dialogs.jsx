import { useEffect, useRef } from "react";
import ButtonArrow from "../ButtonArrow.jsx";

function closeOnBackdrop(event) {
  if (event.target !== event.currentTarget) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    event.currentTarget.close();
}

export default function Dialogs({
  project,
  privacyOpen,
  onProjectClose,
  onPrivacyClose,
}) {
  const projectDialog = useRef(null);
  const privacyDialog = useRef(null);
  useEffect(() => {
    if (project && !projectDialog.current.open)
      projectDialog.current.showModal();
    if (privacyOpen && !privacyDialog.current.open)
      privacyDialog.current.showModal();
    document.body.classList.toggle(
      "dialog-open",
      Boolean(project || privacyOpen),
    );
    return () => document.body.classList.remove("dialog-open");
  }, [project, privacyOpen]);
  return (
    <>
      <dialog
        className="project-dialog"
        ref={projectDialog}
        onClose={() => onProjectClose()}
        onClick={closeOnBackdrop}
        aria-labelledby="project-dialog-title"
      >
        <button
          className="dialog-close"
          onClick={() => projectDialog.current.close()}
          aria-label="Close project details"
        >
          ×
        </button>
        <div className="dialog-eyebrow">UNBRANDED SOLUTION CONCEPT</div>
        <h2 id="project-dialog-title">{project?.name}</h2>
        <p className="dialog-description">{project?.description}</p>
        <div className="dialog-tags">
          {project?.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="dialog-detail">
          <h3>The possibility</h3>
          <p>{project?.detail}</p>
        </div>
        <p className="dialog-disclaimer">
          An illustrative concept, not a live website or commissioned client
          project.
        </p>
        <a
          className="button button-dark"
          href="#contact"
          onClick={() => projectDialog.current.close()}
        >
          <span className="button-label">Let’s build something like this</span>
          <ButtonArrow />
        </a>
      </dialog>
      <dialog
        className="privacy-dialog"
        ref={privacyDialog}
        onClose={() => onPrivacyClose()}
        onClick={closeOnBackdrop}
        aria-labelledby="privacy-title"
      >
        <button
          className="dialog-close"
          onClick={() => privacyDialog.current.close()}
          aria-label="Close privacy notice"
        >
          ×
        </button>
        <div className="dialog-eyebrow">YOUR INFORMATION, RESPECTED.</div>
        <h2 id="privacy-title">Privacy notice</h2>
        <p>
          This website does not use analytics or advertising cookies. Fonts and
          visual assets are hosted with this website; no third-party font
          requests are made.
        </p>
        <p>
          The contact form prepares an email in your email app. Your details are
          not stored by this website. If you choose to send the email, we use
          the information you provide only to respond to your enquiry and
          discuss your project.
        </p>
        <p>
          Please don’t include sensitive personal information in your message.
        </p>
      </dialog>
    </>
  );
}
