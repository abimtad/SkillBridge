import http from "http";
import fs from "fs";
import path from "path";
import { URL } from "url";

// Prepare a simple static file
const htmlPath = path.join(process.cwd(), "index.html");
if (!fs.existsSync(htmlPath)) {
  fs.writeFileSync(
    htmlPath,
    "<!DOCTYPE html><html><body><h1>HTTP Demo</h1><p>Static file served.</p></body></html>"
  );
}

const server = http.createServer((req, res) => {
  // Parse request URL
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  if (reqUrl.pathname === "/api/echo" && req.method === "GET") {
    const msg = reqUrl.searchParams.get("msg") || "Hello";
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: msg, time: Date.now() }));
  }

  if (reqUrl.pathname === "/api/time") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ now: new Date().toISOString() }));
  }

  if (reqUrl.pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return fs.createReadStream(htmlPath).pipe(res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
