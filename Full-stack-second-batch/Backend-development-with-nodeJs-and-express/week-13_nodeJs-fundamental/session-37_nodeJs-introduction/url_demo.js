import { URL, URLSearchParams } from "url";

// Constructing a URL
const apiUrl = new URL("https://example.com/api/v1/resource");
apiUrl.searchParams.set("page", "2");
apiUrl.searchParams.set("limit", "10");
console.log("Built URL:", apiUrl.toString());

// Parsing existing URL
const toParse =
  "https://user:pass@sub.example.com:8443/products/list?category=books&sort=asc#section2";
const parsed = new URL(toParse);
console.log("Host:", parsed.host);
console.log("Hostname:", parsed.hostname);
console.log("Port:", parsed.port);
console.log("Protocol:", parsed.protocol);
console.log("Pathname:", parsed.pathname);
console.log("Hash:", parsed.hash);
console.log("Username:", parsed.username);
console.log("Search params keys:", Array.from(parsed.searchParams.keys()));

// Iterating search params
for (const [key, value] of parsed.searchParams) {
  console.log(`Param ${key} = ${value}`);
}

// Using URLSearchParams standalone
const params = new URLSearchParams({ q: "nodejs", page: "1" });
params.append("filter", "recent");
console.log("Serialized params:", params.toString());

// Modifying query safely
parsed.searchParams.delete("sort");
parsed.searchParams.set("category", "tech");
console.log("Modified URL:", parsed.toString());

// Relative resolution
const base = new URL("https://example.com/docs/guide/");
const relative = new URL("../api/", base); // resolves path traversal
console.log("Relative resolved:", relative.toString());
