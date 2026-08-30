import { useCallback, useEffect, useRef, useState } from "react";
import { minutesToSeconds, remainingFromEnd } from "../lib/timer";

export type TimerStatus = "idle" | "running" | "paused" | "done";

type Options = {
  initialMinutes: number;
  onComplete: (minutes: number) => void;
};

export function useFocusTimer({ initialMinutes, onComplete }: Options) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [remaining, setRemaining] = useState(minutesToSeconds(initialMinutes));
  const endAtRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (status !== "running" || endAtRef.current === null) return;

    const tick = () => {
      const endAt = endAtRef.current;
      if (endAt === null) return;
      const next = remainingFromEnd(endAt, Date.now());
      setRemaining(next);
      if (next <= 0) {
        setStatus("done");
        endAtRef.current = null;
        onCompleteRef.current(minutes);
      }
    };

    tick();
    const id = window.setInterval(tick, 200);
    return () => window.clearInterval(id);
  }, [status, minutes]);

  const start = useCallback(() => {
    const from =
      status === "paused" || status === "running" ? remaining : minutesToSeconds(minutes);
    endAtRef.current = Date.now() + from * 1000;
    setRemaining(from);
    setStatus("running");
  }, [minutes, remaining, status]);

  const pause = useCallback(() => {
    setStatus("paused");
    endAtRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    endAtRef.current = null;
    setRemaining(minutesToSeconds(minutes));
  }, [minutes]);

  const changeMinutes = useCallback(
    (next: number) => {
      setMinutes(next);
      if (status === "idle" || status === "done") {
        setStatus("idle");
        setRemaining(minutesToSeconds(next));
      }
    },
    [status],
  );

  return { minutes, status, remaining, start, pause, reset, changeMinutes };
}
