export default function IconLibrary() {
  return (
    <svg
      className="svg-library"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <symbol id="brand-mark" viewBox="0 0 48 48">
          <path
            d="M8 26 37 19C34 9 24 5 15 10S4 26 10 34s15 10 23 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="40" cy="31.5" r="3.5" fill="currentColor" />
        </symbol>
        <symbol id="arrow-up-right" viewBox="0 0 24 24">
          <path
            d="M5 19 19 5M5 5h14v14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="arrow-right" viewBox="0 0 24 24">
          <path
            d="M4 12h16m-6-6 6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="plus" viewBox="0 0 24 24">
          <path
            d="M12 5v14M5 12h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </symbol>
      </defs>
    </svg>
  );
}
