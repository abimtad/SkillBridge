# Core Module Demos: fs, path, http, url

## 1. fs (File System)

The `fs` module provides APIs to interact with the filesystem: reading, writing, appending, deleting files, inspecting metadata (stat), streaming large files, and working both asynchronously (non-blocking) and synchronously. Prefer async methods in production; sync methods block the event loop. Streams allow processing large data without loading it entirely into memory.
Demo: `fs_demo.js` illustrates callback, sync, promise-based, and streaming usage.
Run: `npm run demo:fs`

## 2. path

The `path` module offers utilities for manipulating filesystem paths in a cross-platform manner. It handles separators, normalizing, joining segments, resolving to absolute paths, parsing into components (root, dir, base, name, ext), and formatting from parts. Using `path.join` and `path.resolve` avoids hard-coded separators and bugs across OSes.
Demo: `path_demo.js` shows join, resolve, parse, relative, format.
Run: `npm run demo:path`

## 3. http

The `http` module enables creating raw HTTP servers and clients. With `http.createServer`, you receive low-level request/response objects. You manually handle routing, headers, status codes, streaming response bodies. It forms the foundation for frameworks like Express. Understanding raw http helps with performance tuning and debugging.
Demo: `http_demo.js` serves a static HTML file and simple JSON endpoints.
Run: `npm run demo:http` then visit `http://localhost:4000/` or `/api/echo?msg=Hi`.

## 4. url

The WHATWG `URL` and `URLSearchParams` APIs parse, inspect, and manipulate URLs safely. They expose components (protocol, host, port, pathname, search params, hash, username/password). Modifying search parameters is safer than manual string slicing. Relative resolution (new URL(relative, base)) normalizes path traversal.
Demo: `url_demo.js` constructs, parses, iterates, mutates, and resolves URLs.
Run: `npm run demo:url`

## Quick Commands

```bash
npm run demo:fs
npm run demo:path
npm run demo:http
npm run demo:url
```

Each script logs explanatory output directly.
