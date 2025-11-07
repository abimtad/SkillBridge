# React Forms Teaching Examples

This mini-project contains small, focused examples for teaching common React form patterns:

- Controlled forms
- Manual validation
- Formik (with Yup schema)
- React Hook Form
- File upload handling

Files of interest are under `src/components` and each component contains comments explaining the flow.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

Notes for the lesson

- Open browser devtools console to observe mock API calls and debug flows.
- The `src/utils/mockApi.js` file simulates network latency and errors.
- If you want to demonstrate a server-side validation error, submit a form with `username` equal to `error` (used by mockApi).

Possible follow-ups (assign as exercises):

- Add unit tests for form validation logic.
- Add more forms showing dependent fields and conditional validation.
- Wire a real backend endpoint for file uploads with fetch and FormData.
