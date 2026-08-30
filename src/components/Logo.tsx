type Props = {
  href?: string;
};

export function Logo({ href = "#top" }: Props) {
  return (
    <a className="logo" href={href} aria-label="FocusFlow home">
      <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="#334155" strokeWidth="2.4" />
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="18 50"
          transform="rotate(-90 12 12)"
        />
      </svg>
      FocusFlow
    </a>
  );
}
