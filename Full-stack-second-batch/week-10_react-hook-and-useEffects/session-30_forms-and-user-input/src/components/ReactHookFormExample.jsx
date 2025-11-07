import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitForm } from "../utils/mockApi";

/*
  ReactHookFormExample
  - Shows the minimal API surface of react-hook-form.
  - Great performance for large forms because it avoids rerenders.
*/
export default function ReactHookFormExample() {
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(values) {
    setStatus({ loading: true });
    try {
      const res = await submitForm(values);
      console.log("RHF submit", res);
      setStatus({ ok: true, data: res });
      reset();
    } catch (err) {
      console.error("RHF error", err);
      setStatus({ ok: false, error: err.message || String(err) });
    }
  }

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
          <input
            id="title"
            {...register("title", { required: "Title required" })}
          />
          {errors.title && <div className="error">{errors.title.message}</div>}
        </div>

        <div className="form-row">
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            type="number"
            {...register("rating", {
              valueAsNumber: true,
              min: { value: 1, message: "Min 1" },
            })}
          />
          {errors.rating && (
            <div className="error">{errors.rating.message}</div>
          )}
        </div>

        <div className="form-row">
          <label />
          <button type="submit" disabled={isSubmitting}>
            Submit (RHF)
          </button>
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
