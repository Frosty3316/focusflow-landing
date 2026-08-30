import { useState, type FormEvent } from "react";
import { saveWaitlistEntry } from "../lib/storage";
import { isValidEmail, isValidName, normalizeName } from "../lib/waitlist";

type Errors = {
  name?: string;
  email?: string;
};

export function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!isValidName(name)) next.name = "Use a name between 2 and 80 characters.";
    if (!isValidEmail(email)) next.email = "Enter a valid email.";
    setErrors(next);
    if (next.name || next.email) return;

    saveWaitlistEntry({
      name: normalizeName(name),
      email: email.trim(),
      at: new Date().toISOString(),
    });
    setDone(true);
  }

  return (
    <section className="section" id="waitlist">
      <div className="wrap">
        <div className="waitlist">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Join the waitlist</h2>
          <p className="section-lead">
            This form does not email anyone. It validates, then keeps one entry on this
            device so you can see a finished state.
          </p>
          {done ? (
            <p className="waitlist-success" role="status">
              Saved on this device. In a real product this would hit an API.
            </p>
          ) : (
            <form className="waitlist-form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="waitlist-name">Name</label>
                <input
                  id="waitlist-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                {errors.name ? <p className="field-error">{errors.name}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="waitlist-email">Email</label>
                <input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errors.email ? <p className="field-error">{errors.email}</p> : null}
              </div>
              <button type="submit" className="btn">
                Join
              </button>
            </form>
          )}
          <p className="form-note">No backend. No third-party form service.</p>
        </div>
      </div>
    </section>
  );
}
