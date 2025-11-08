import React, { useState } from "react";
import { submitForm } from "../utils/mockApi";

/*
  ValidationForm
  - Shows manual validation patterns: onChange and onBlur checks, an errors object.
  - Good for teaching what's happening under the hood before introducing libraries.
*/
export default function ValidationForm() {
  function validate(values) {}

  function handleChange(e) {}

  function handleBlur(e) {}

  async function handleSubmit(e) {}

  return (
    <section>
      <h2>Manual Validation</h2>
      <p>
        This shows building validation yourself (useful to understand library
        behavior).
      </p>

      <form>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input />
        </div>

        <div className="form-row">
          <label />
          <button type="submit">Submit (Validate)</button>
        </div>
      </form>
    </section>
  );
}
