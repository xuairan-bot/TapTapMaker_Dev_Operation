const fs = require("fs");
const http = require("http");
const path = require("path");

const rootDir = __dirname;
const defaultFile = "taptap-maker-guide-optimized.html";
const requestedPort = Number(process.env.PORT || process.argv[2] || 4173);
const host = process.env.HOST || "127.0.0.1";
const clients = new Set();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

const liveReloadSnippet = `
<script>
(() => {
  const source = new EventSource("/__live_reload");
  source.addEventListener("reload", () => location.reload());
})();
</script>`;

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function safeResolve(requestPath) {
  const parsedPath = decodeURIComponent(requestPath.split("?")[0]);
  const normalized = parsedPath === "/" ? `/${defaultFile}` : parsedPath;
  const resolved = path.resolve(rootDir, `.${normalized}`);

  if (!resolved.startsWith(rootDir)) {
    return null;
  }

  return resolved;
}

function injectLiveReload(html) {
  if (html.includes("</body>")) {
    return html.replace("</body>", `${liveReloadSnippet}\n</body>`);
  }

  return `${html}\n${liveReloadSnippet}`;
}

function handleLiveReload(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("event: connected\ndata: ok\n\n");
  clients.add(res);

  req.on("close", () => {
    clients.delete(res);
  });
}

function notifyReload(changedFile) {
  for (const client of clients) {
    client.write(`event: reload\ndata: ${changedFile}\n\n`);
  }
}

function serveFile(req, res) {
  const requestUrl = new URL(req.url, "http://localhost").pathname;

  if (requestUrl === "/__live_reload") {
    handleLiveReload(req, res);
    return;
  }

  const filePath = safeResolve(requestUrl);
  if (!filePath) {
    send(res, 403, { "Content-Type": "text/plain; charset=utf-8" }, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, buffer) => {
    if (error) {
      send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    const isHtml = ext === ".html";
    const body = isHtml ? injectLiveReload(buffer.toString("utf8")) : buffer;

    send(res, 200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    }, body);
  });
}

function watchFiles() {
  let timer = null;

  fs.watch(rootDir, { recursive: false }, (eventType, filename) => {
    if (!filename || filename.startsWith(".git")) {
      return;
    }

    const ext = path.extname(filename).toLowerCase();
    if (![".html", ".css", ".js", ".json"].includes(ext)) {
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => notifyReload(filename), 120);
  });
}

const server = http.createServer(serveFile);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    const nextPort = requestedPort + 1;
    console.log(`Port ${requestedPort} is in use, trying ${nextPort}...`);
    server.listen(nextPort, host);
    return;
  }

  throw error;
});

server.on("listening", () => {
  const address = server.address();
  const port = typeof address === "object" ? address.port : requestedPort;
  const localHost = host === "0.0.0.0" ? "127.0.0.1" : host;
  console.log(`Preview: http://${localHost}:${port}/`);
  console.log(`Direct:  http://${localHost}:${port}/${defaultFile}`);
  if (host === "0.0.0.0") {
    console.log("LAN mode is enabled. Use this computer's intranet IP with the same port.");
  }
  console.log("Watching local HTML/CSS/JS/JSON files. Press Ctrl+C to stop.");
});

watchFiles();
server.listen(requestedPort, host);
