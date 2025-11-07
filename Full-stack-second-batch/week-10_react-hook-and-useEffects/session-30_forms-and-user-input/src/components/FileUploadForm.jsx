import React, { useRef, useState } from "react";
import { submitForm } from "../utils/mockApi";

/*
  FileUploadForm
  - Demonstrates file input handling in React and previewing files.
  - Uses a FormData object to simulate a multipart upload.
  - Shows how to handle upload progress (simulated) and errors.
*/
export default function FileUploadForm() {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState(null);

  function handleFileChange() {
    const file = fileRef.current.files[0];
    if (!file) return;
    // Create a preview for images
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const file = fileRef.current.files[0];
    if (!file) {
      setStatus({ ok: false, error: "Please pick a file" });
      return;
    }

    // Build FormData as you'd do for a real upload
    const fd = new FormData();
    fd.append("file", file);

    setStatus({ loading: true });
    try {
      // Our mock api accepts plain objects, so simulate the form fields
      const res = await submitForm({ filename: file.name, size: file.size });
      setStatus({ ok: true, data: res });
    } catch (err) {
      setStatus({ ok: false, error: err.message });
    }
  }

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
          <input
            id="file"
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
          />
        </div>

        {preview && (
          <div className="form-row">
            <label />
            <img
              src={preview}
              alt="preview"
              style={{ maxWidth: 200, borderRadius: 6 }}
            />
          </div>
        )}

        <div className="form-row">
          <label />
          <button type="submit">Upload</button>
        </div>
      </form>

      {status && (
        <pre className="response">{JSON.stringify(status, null, 2)}</pre>
      )}
    </section>
  );
}
