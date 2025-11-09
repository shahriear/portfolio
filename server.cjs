// server.cjs (CommonJS — cPanel/lsnode safe)
const http = require("node:http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => handle(req, res))
      .listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
  })
  .catch((err) => {
    console.error("Next.js failed to start:", err);
    process.exit(1);
  });
