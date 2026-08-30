const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    popular: false,
    points: ["25 / 15 / 5 sessions", "Local streak", "Works in this browser"],
  },
  {
    name: "Pro",
    price: "$6",
    period: "/ month",
    popular: true,
    points: ["Custom lengths", "Session notes", "Optional end sound"],
  },
  {
    name: "Team",
    price: "$12",
    period: "/ seat",
    popular: false,
    points: ["Shared quiet hours", "No activity feed", "Same local-first default"],
  },
];

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <p className="section-kicker">Pricing</p>
        <h2 className="section-title">Plans as a product story</h2>
        <p className="section-lead">
          The timer on this page is real. The paid tiers are fiction for a landing page —
          they exist to show a pricing conversation, not a checkout.
        </p>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={plan.popular ? "price-card popular" : "price-card"} key={plan.name}>
              {plan.popular ? <p className="popular-label">Most used</p> : null}
              <h3>{plan.name}</h3>
              <p className="price">
                {plan.price}
                <span>{plan.period}</span>
              </p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a className="btn" href="#waitlist">
                Join waitlist
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
