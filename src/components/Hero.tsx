import { TimerPreview } from "./TimerPreview";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="section-kicker">Local-first focus timer</p>
          <h1>Sit down. Start the clock.</h1>
          <p className="hero-lead">
            FocusFlow is a timer for people who already know what to do. Pick a length.
            Work until it ends. Nothing else is on the screen.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#timer">
              Try a session
            </a>
            <a className="btn btn-ghost" href="#how">
              See how it works
            </a>
          </div>
        </div>
        <TimerPreview />
      </div>
    </section>
  );
}
