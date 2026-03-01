import express from "express";
import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Tenta carregar certificado SSL do KingHost (~/apps_nodejs/certificado/*.pem)
  // O arquivo .pem do KingHost contém chave + certificado + CA em um único arquivo
  // Se não existir, sobe em HTTP normal (ambiente de desenvolvimento)
  const certDir = path.resolve(__dirname, "..", "certificado");
  const pemFile = fs.existsSync(certDir)
    ? (fs.readdirSync(certDir).find((f) => f.startsWith("portfolio") && f.endsWith(".pem")) ??
       fs.readdirSync(certDir).find((f) => f.endsWith(".pem")))
    : undefined;
  const pemPath = pemFile ? path.join(certDir, pemFile) : undefined;
  const hasSSL = !!pemPath && fs.existsSync(pemPath);

  const server = hasSSL
    ? createHttpsServer(
        { key: fs.readFileSync(pemPath!), cert: fs.readFileSync(pemPath!) },
        app
      )
    : createHttpServer(app);

  // Auto-detecta o caminho dos arquivos estaticos
  const productionPath = path.resolve(__dirname, "public");
  const devPath = path.resolve(__dirname, "..", "dist", "public");
  const staticPath = fs.existsSync(path.join(productionPath, "index.html"))
    ? productionPath
    : devPath;

  // ── Contato ──────────────────────────────────────────────────────────────
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 3,
    message: { error: "Muitas tentativas. Aguarde 15 minutos e tente novamente." },
  });

  app.post("/api/contact", contactLimiter, async (req, res) => {
    const { name, email, message } = req.body ?? {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }
    if (message.trim().length < 10) {
      return res.status(400).json({ error: "Mensagem muito curta." });
    }

    const smtpHost = process.env.SMTP_HOST ?? "mail.anacron.com.br";
    const smtpUser = process.env.SMTP_USER ?? "lucas@anacron.com.br";
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      console.error("[contact] SMTP_PASS não configurado");
      return res.status(503).json({ error: "Serviço de email não configurado." });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    });

    try {
      // Email para Lucas
      await transporter.sendMail({
        from: `"Portfolio" <${smtpUser}>`,
        to: "lucas@anacron.com.br",
        replyTo: email,
        subject: `[Portfolio] Nova mensagem de ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#2563eb">Nova mensagem pelo portfólio</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <blockquote style="border-left:4px solid #2563eb;padding:12px 16px;background:#f1f5f9;border-radius:4px">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
          </div>
        `,
      });

      // Confirmação automática para o remetente
      await transporter.sendMail({
        from: `"Lucas André" <${smtpUser}>`,
        to: email,
        subject: "Recebi sua mensagem — Lucas André",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#2563eb">Olá, ${name}!</h2>
            <p>Recebi sua mensagem e responderei em até <strong>24 horas úteis</strong>.</p>
            <p style="color:#6b7280">Sua mensagem:</p>
            <blockquote style="border-left:4px solid #2563eb;padding:12px 16px;background:#f1f5f9;border-radius:4px;color:#374151">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
            <p style="color:#6b7280;font-size:14px">
              Lucas André · Full Stack Developer<br>
              <a href="https://portfolio.anacron.com.br:21017" style="color:#2563eb">portfolio.anacron.com.br</a> ·
              <a href="https://linkedin.com/in/lucas-andre-fernando" style="color:#2563eb">LinkedIn</a>
            </p>
          </div>
        `,
      });

      res.json({ success: true });
    } catch (err) {
      console.error("[contact] Erro ao enviar email:", err);
      res.status(500).json({ error: "Erro ao enviar mensagem. Tente novamente." });
    }
  });

  app.use(express.static(staticPath));

  // React Router — todas as rotas servem o index.html
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // KingHost define a porta via PORT_NOMEDOSCRIPT (ex: PORT_INDEX para index.js)
  const kingHostPort = Object.entries(process.env)
    .find(([key]) => key.startsWith("PORT_"))?.[1];
  const port = kingHostPort || process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on port ${port} (${hasSSL ? "HTTPS" : "HTTP"})`);
  });

  // Graceful shutdown: fecha o servidor antes de sair para liberar a porta
  const shutdown = () => { server.close(() => process.exit(0)); };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch(console.error);
