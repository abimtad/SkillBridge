import React, { useState } from "react";
import { submitForm } from "../utils/mockApi";

/*
  ControlledForm
  - Demonstrates the classic controlled inputs pattern in React.
  - Every input's value is driven by component state and updated via onChange.
  - Good for small/medium forms, explicit control and transformations.
*/
export default function ControlledForm() {
  function handleChange(e) {}

  async function handleSubmit(e) {}

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
          <input />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input />
        </div>

        <div className="form-row">
          <label htmlFor="subscribe">Subscribe</label>
          <input />
        </div>

        <div className="form-row">
          <label />
          <button type="submit">Submit (Controlled)</button>
        </div>
      </form>
    </section>
  );
}
