import React, { useRef, useState } from "react";
import { submitForm } from "../utils/mockApi";

/*
  FileUploadForm
  - Demonstrates file input handling in React and previewing files.
  - Uses a FormData object to simulate a multipart upload.
  - Shows how to handle upload progress (simulated) and errors.
*/
export default function FileUploadForm() {
  function handleFileChange() {}

  async function handleSubmit(e) {}

  return (
    <section>
      <h2>File Upload</h2>
      <p>
        File input is uncontrolled — use a ref to read files and FormData to
        upload.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="file">Pick file</label>
          <input />
        </div>

        <div className="form-row">
          <label />
          <button type="submit">Upload</button>
        </div>
      </form>
    </section>
  );
}
