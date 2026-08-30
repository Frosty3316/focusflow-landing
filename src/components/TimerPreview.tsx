import { PRESETS, formatTime, isPreset, progress, statusLabel } from "../lib/timer";
import { useFocusTimer } from "../hooks/useFocusTimer";
import { useStats } from "../hooks/useStats";

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerPreview() {
  const { stats, completeSession, rememberDuration } = useStats();
  const timer = useFocusTimer({
    initialMinutes: isPreset(stats.lastDurationMinutes) ? stats.lastDurationMinutes : 25,
    onComplete: completeSession,
  });

  const pct = progress(timer.remaining, timer.minutes * 60);
  const offset = pct * CIRCUMFERENCE;
  const running = timer.status === "running";

  return (
    <div className="timer-shell" id="timer">
      <div className="timer-chrome">
        <div className="timer-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>Focus session</span>
      </div>
      <div className="timer-body">
        <p className="sr-only" aria-live="polite">
          {statusLabel(timer.status, timer.remaining)}
        </p>
        <div className="timer-ring">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle className="timer-ring-track" cx="100" cy="100" r={RADIUS} />
            <circle
              className="timer-ring-value"
              cx="100"
              cy="100"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="timer-readout">
            <strong>{formatTime(timer.remaining)}</strong>
            <span>{timer.status === "done" ? "Done" : `${timer.minutes} min session`}</span>
          </div>
        </div>
        <div className="presets" role="group" aria-label="Session length">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className="chip"
              aria-pressed={timer.minutes === preset}
              disabled={running}
              onClick={() => {
                timer.changeMinutes(preset);
                rememberDuration(preset);
              }}
            >
              {preset} min
            </button>
          ))}
        </div>
        <div className="timer-controls">
          {running ? (
            <button type="button" className="btn" onClick={timer.pause}>
              Pause
            </button>
          ) : (
            <button type="button" className="btn" onClick={timer.start}>
              {timer.status === "paused" ? "Resume" : "Start"}
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={timer.reset}>
            Reset
          </button>
        </div>
        <p className="timer-stats">
          {stats.completed} session{stats.completed === 1 ? "" : "s"} · {stats.streak} day streak
        </p>
      </div>
    </div>
  );
}
