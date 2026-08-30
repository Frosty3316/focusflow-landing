const steps = [
  {
    title: "Pick a length",
    copy: "25 for deep work, 15 for a hard chunk, 5 when you only have a sliver.",
  },
  {
    title: "Work until the ring empties",
    copy: "Start. Stay with the one thing you sat down to do. Pause only if you have to.",
  },
  {
    title: "Stop, then decide",
    copy: "The session ends on purpose. The streak updates if you finished. Then you get up.",
  },
];

export function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <p className="section-kicker">How it works</p>
        <h2 className="section-title">Three moves. Then you are in it.</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <article className="step" key={step.title}>
              <div className="step-index" aria-hidden="true">
                {index + 1}
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
