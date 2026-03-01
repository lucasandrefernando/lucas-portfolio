import express from "express";
import { createServer } from "http";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Auto-detecta o caminho dos arquivos estaticos
  // Em producao (KingHost): public/ fica na mesma pasta que index.js
  // Em dev local: dist/public/
  const productionPath = path.resolve(__dirname, "public");
  const devPath = path.resolve(__dirname, "..", "dist", "public");
  const staticPath = fs.existsSync(path.join(productionPath, "index.html"))
    ? productionPath
    : devPath;

  // ── Deploy webhook ───────────────────────────────────────────────────────
  // GitHub Actions envia os arquivos buildados como tar.gz via POST HTTP.
  // Isso evita dependencia de SSH/FTP que sao bloqueados por IP no KingHost.
  app.post("/api/deploy", (req, res) => {
    const token = req.headers["x-deploy-token"];
    const deployToken = process.env.DEPLOY_TOKEN;

    if (!deployToken) {
      return res.status(503).json({ error: "DEPLOY_TOKEN not configured on server" });
    }
    if (token !== deployToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const tmpFile = `/tmp/deploy-${Date.now()}.tar.gz`;
    const writeStream = fs.createWriteStream(tmpFile);

    req.pipe(writeStream);

    writeStream.on("finish", () => {
      // Responde antes de extrair para nao ser cortado pelo restart do PM2
      res.json({ success: true, message: "Deploy recebido, extraindo arquivos..." });

      exec(`tar -xzf ${tmpFile} -C ${__dirname}`, (err, _stdout, stderr) => {
        fs.unlink(tmpFile, () => {});
        if (err) {
          console.error("[deploy] Erro ao extrair:", stderr);
        } else {
          console.log("[deploy] Arquivos atualizados - PM2 vai reiniciar automaticamente");
        }
      });
    });

    writeStream.on("error", (err) => {
      if (!res.headersSent) {
        res.status(500).json({ error: err.message });
      }
    });
  });

  app.use(express.static(staticPath));

  // React Router - todas as rotas servem o index.html
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // KingHost define a porta via PORT_NOMEDOSCRIPT (ex: PORT_INDEX para index.js)
  const kingHostPort = Object.entries(process.env)
    .find(([key]) => key.startsWith("PORT_"))?.[1];
  const port = kingHostPort || process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  // Graceful shutdown: fecha o servidor antes de sair para liberar a porta
  // Necessário para o PM2 conseguir reiniciar sem EADDRINUSE
  const shutdown = () => {
    server.close(() => process.exit(0));
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch(console.error);
