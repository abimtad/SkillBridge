import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitForm } from "../utils/mockApi";

/*
  ReactHookFormExample
  - Shows the minimal API surface of react-hook-form.
  - Great performance for large forms because it avoids rerenders.
*/
export default function ReactHookFormExample() {
  async function onSubmit(values) {}

  return (
    <section>
      <h2>React Hook Form</h2>
      <p>
        Uses uncontrolled inputs under the hood and registers refs for great
        performance.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label htmlFor="title">Title</label>
          <input />
        </div>

        <div className="form-row">
          <label htmlFor="rating">Rating</label>
          <input />
        </div>

        <div className="form-row">
          <label />
          <button>Submit (RHF)</button>
        </div>
      </form>
    </section>
  );
}
