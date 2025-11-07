import React, { useState } from "react";
import ControlledForm from "./components/ControlledForm";
import ValidationForm from "./components/ValidationForm";
import FormikExample from "./components/FormikExample";
import ReactHookFormExample from "./components/ReactHookFormExample";
import FileUploadForm from "./components/FileUploadForm";

/*
  App — teaching layout
  - Provides a simple tabbed UI to switch between examples.
  - Each component under /components is focused on a single topic.
*/
export default function App() {
  const [tab, setTab] = useState("controlled");

  return (
    <div className="app">
      <header>
        <h1>React Forms — Teaching Examples</h1>
        <p>
          Topics: Controlled forms, validation, Formik, React Hook Form, file
          uploads, submission handling.
        </p>
      </header>

      <nav className="tabs">
        <button onClick={() => setTab("controlled")}>Controlled</button>
        <button onClick={() => setTab("validation")}>Validation</button>
        <button onClick={() => setTab("rhf")}>React Hook Form</button>
        <button onClick={() => setTab("upload")}>File Upload</button>
      </nav>

      <main>
        {tab === "controlled" && <ControlledForm />}
        {tab === "validation" && <ValidationForm />}
        {tab === "rhf" && <ReactHookFormExample />}
        {tab === "upload" && <FileUploadForm />}
      </main>

      <footer>
        <small>
          Open the console to see submission flow and mock API responses.
        </small>
      </footer>
    </div>
  );
}
