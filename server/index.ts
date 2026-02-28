import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Auto-detecta caminho dos arquivos estáticos (funciona em dev e na KingHost)
  const productionPath = path.resolve(__dirname, "public");
  const devPath = path.resolve(__dirname, "..", "dist", "public");
  const staticPath = fs.existsSync(path.join(productionPath, "index.html"))
    ? productionPath
    : devPath;

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // KingHost usa PORT_NOMEDOSCRIPT (ex: PORT_INDEX para index.js)
  // Esta lógica detecta automaticamente qualquer variável PORT_*
  const kingHostPort = Object.entries(process.env)
    .find(([key]) => key.startsWith("PORT_"))?.[1];
  const port = kingHostPort || process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
