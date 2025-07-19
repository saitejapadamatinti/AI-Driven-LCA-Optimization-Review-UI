export const IconSpinner = ({ className = "h-5 w-5", strokeWidth = 2 }) => (
  <svg
    className={`animate-spin ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="status"
    aria-label="Loading"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="#000"
      strokeWidth={strokeWidth}
    />
    <path
      className="opacity-75"
      d="M4 12a8 8 0 018-8"
      stroke="#000"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);
