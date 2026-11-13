export default function ButtonArrow() {
  return (
    <span className="button-icon" aria-hidden="true">
      <svg className="arrow-main">
        <use href="#arrow-up-right" />
      </svg>
      <svg className="arrow-follow">
        <use href="#arrow-up-right" />
      </svg>
    </span>
  );
}
