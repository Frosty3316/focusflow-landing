import { useState } from "react";

const items = [
  {
    q: "Is this a to-do app?",
    a: "No. Task lists belong somewhere else. FocusFlow is only the session: start, work, stop.",
  },
  {
    q: "Where does my data go?",
    a: "Into localStorage on this device, under a versioned focusflow:v1 key. Corrupt data is dropped instead of crashing the page. Nothing is uploaded.",
  },
  {
    q: "Why show pricing if the product is local?",
    a: "Because this is a portfolio landing page. The live timer is the product. Paid plans are the marketing structure recruiters expect to see, labeled as fiction.",
  },
  {
    q: "Is the waitlist real?",
    a: "No. The form validates and stores one entry on this device so you can see the success state. A production list would POST to an API.",
  },
  {
    q: "Does it work offline?",
    a: "After the page has loaded, yes. There is no service worker and no install prompt. That keeps the demo small and honest.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <p className="section-kicker">FAQ</p>
        <h2 className="section-title">The honest answers</h2>
        <div className="faq-list">
          {items.map((item, index) => {
            const expanded = open === index;
            const panelId = `faq-panel-${index}`;
            return (
              <article className="faq-item" key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    {item.q}
                    <span aria-hidden="true">{expanded ? "–" : "+"}</span>
                  </button>
                </h3>
                <p id={panelId} hidden={!expanded}>
                  {item.a}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
