const features = [
  {
    title: "Distraction-free",
    copy: "No inbox, no feed, no second job hiding in a sidebar. The timer is the product.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 1.5" />
      </svg>
    ),
  },
  {
    title: "Timed sessions",
    copy: "Twenty-five, fifteen, or five. You choose a length. The ring empties. Then you stop.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="13" r="7" />
        <path d="M9 3h6" />
      </svg>
    ),
  },
  {
    title: "Streaks you can ignore",
    copy: "A count of days you showed up. Not a leaderboard. Not a badge wall.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M5 19V9l7-5 7 5v10" />
        <path d="M9 19v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Local and private",
    copy: "Sessions stay in this browser. There is no account, no cloud, and nothing to sync.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <p className="section-kicker">Why it exists</p>
        <h2 className="section-title">One job. The clock.</h2>
        <p className="section-lead">
          Most productivity tools grow until they need a tutorial. FocusFlow stays a timer
          so starting work does not become more work.
        </p>
        <div className="features-grid">
          {features.map((feature) => (
            <article className="card" key={feature.title}>
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
