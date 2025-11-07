import React, { useState } from "react";
import { submitForm } from "../utils/mockApi";

/*
  ControlledForm
  - Demonstrates the classic controlled inputs pattern in React.
  - Every input's value is driven by component state and updated via onChange.
  - Good for small/medium forms, explicit control and transformations.
*/
export default function ControlledForm() {
  const [form, setForm] = useState({ name: "", email: "", subscribe: false });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true });
    try {
      const res = await submitForm(form);
      setStatus({ ok: true, data: res });
      console.log("Controlled submit success", res);
    } catch (err) {
      setStatus({ ok: false, error: err.message || String(err) });
    }
  }

  return (
    <section>
      <h2>Controlled Form</h2>
      <p>
        Each input is controlled by React state. Useful when you need immediate
        access to values.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="subscribe">Subscribe</label>
          <input
            id="subscribe"
            name="subscribe"
            type="checkbox"
            checked={form.subscribe}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label />
          <button type="submit">Submit (Controlled)</button>
        </div>
      </form>

      {status && (
        <div style={{ marginTop: 12 }}>
          <strong>Result:</strong>
          <pre className="response">{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}
