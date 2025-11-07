import React, { useState } from "react";
import { submitForm } from "../utils/mockApi";

/*
  ValidationForm
  - Shows manual validation patterns: onChange and onBlur checks, an errors object.
  - Good for teaching what's happening under the hood before introducing libraries.
*/
export default function ValidationForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  function validate(values) {
    const e = {};
    if (!values.username) e.username = "Username required";
    if (!values.password) e.password = "Password required";
    else if (values.password.length < 6) e.password = "Minimum 6 characters";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    const newErrors = validate({ ...form });
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setStatus({ loading: true });
    try {
      const res = await submitForm(form);
      setStatus({ ok: true, data: res });
    } catch (err) {
      setStatus({ ok: false, error: err.message });
    }
  }

  return (
    <section>
      <h2>Manual Validation</h2>
      <p>
        This shows building validation yourself (useful to understand library
        behavior).
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-row">
          <label />
          <button type="submit">Submit (Validate)</button>
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
