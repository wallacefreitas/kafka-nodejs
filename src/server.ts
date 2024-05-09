import { createServer } from "http";
import { bootstrap } from "./bootstrap";

export const httpServer = createServer();

(function main() {
  httpServer.listen('3333', async () => {
    console.log(`✓ Server running on 3333 🚀`);
    bootstrap()
  });
})();