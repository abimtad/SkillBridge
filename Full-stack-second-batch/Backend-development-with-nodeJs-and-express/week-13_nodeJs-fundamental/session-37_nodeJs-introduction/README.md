# Node.js Fundamentals: Core Modules and Demos

## Learning Objectives

By the end of this session, students will:

- Understand the purpose and usage of Node.js core modules.
- Learn how to work with the file system using the `fs` module.
- Manipulate file paths in a cross-platform manner using the `path` module.
- Create a basic HTTP server and handle requests using the `http` module.
- Parse and manipulate URLs using the `url` module.
- Gain hands-on experience by running and modifying demo scripts.

## Core Modules

### 1. fs (File System)

The `fs` module provides APIs to interact with the filesystem. Key functionalities include:

- Reading, writing, appending, and deleting files.
- Inspecting file metadata (e.g., `fs.stat`).
- Streaming large files to avoid loading them entirely into memory.
- Supporting both asynchronous (non-blocking) and synchronous operations.

**Demo:**

- File: `fs_demo.js`
- Concepts covered: Callback-based, synchronous, promise-based, and streaming file operations.
- Run: `npm run demo:fs`

### 2. path

The `path` module offers utilities for working with filesystem paths in a cross-platform manner. It ensures compatibility across operating systems by handling path separators and other quirks.

**Key Methods:**

- `path.join`: Joins path segments.
- `path.resolve`: Resolves to an absolute path.
- `path.parse` and `path.format`: Parse and format paths into components.

**Demo:**

- File: `path_demo.js`
- Concepts covered: Joining, resolving, parsing, and formatting paths.
- Run: `npm run demo:path`

### 3. http

The `http` module enables creating raw HTTP servers and clients. It provides low-level access to:

- Handling HTTP requests and responses.
- Setting headers, status codes, and response bodies.
- Streaming data for efficient communication.

**Demo:**

- File: `http_demo.js`
- Concepts covered: Serving static HTML files and creating simple JSON endpoints.
- Run: `npm run demo:http`
- Access: Visit `http://localhost:4000/` or `/api/echo?msg=Hi`.

### 4. url

The `url` module provides utilities for parsing, constructing, and manipulating URLs. It ensures safe and efficient handling of URL components.

**Key Features:**

- Parse URLs into components (protocol, host, pathname, etc.).
- Modify search parameters using `URLSearchParams`.
- Resolve relative URLs against a base URL.

**Demo:**

- File: `url_demo.js`
- Concepts covered: Parsing, iterating, and resolving URLs.
- Run: `npm run demo:url`

## Quick Commands

To run the demos, use the following commands:

```bash
npm run demo:fs
npm run demo:path
npm run demo:http
npm run demo:url
```

Each script logs explanatory output directly to the console, providing insights into the module's functionality.

## Additional Notes

- **Asynchronous Programming:** Node.js heavily relies on asynchronous programming. Pay attention to how callbacks, promises, and async/await are used in the demos.
- **Event Loop:** Understanding the event loop is crucial for grasping how Node.js handles non-blocking I/O operations.
- **Error Handling:** Always handle errors gracefully, especially when working with file systems and HTTP servers.
