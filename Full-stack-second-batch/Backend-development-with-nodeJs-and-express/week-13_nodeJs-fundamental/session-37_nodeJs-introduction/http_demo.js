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


const PORT = 4000;
server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
