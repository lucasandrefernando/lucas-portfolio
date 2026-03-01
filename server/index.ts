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
    const { name, email, phone, message } = req.body ?? {};

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
      tls: { rejectUnauthorized: false },
    });

    const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "full", timeStyle: "short" });

    try {
      // Notificação para Lucas
      await transporter.sendMail({
        from: `"Portfolio" <${smtpUser}>`,
        to: "lucas@anacron.com.br",
        replyTo: email,
        subject: `[Portfolio] Nova mensagem de ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1f2937">
            <div style="background:#2563eb;padding:24px 32px;border-radius:8px 8px 0 0">
              <h2 style="color:#fff;margin:0;font-size:20px">Nova mensagem pelo portfólio</h2>
              <p style="color:#bfdbfe;margin:4px 0 0;font-size:13px">${now}</p>
            </div>
            <div style="background:#f8fafc;padding:24px 32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:80px">Nome</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#2563eb">${email}</a></td></tr>
                ${phone?.trim() ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px">WhatsApp</td><td style="padding:8px 0"><a href="https://wa.me/${phone.replace(/\D/g,'')}" style="color:#2563eb">${phone}</a></td></tr>` : ''}
              </table>
              <p style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Mensagem</p>
              <blockquote style="border-left:4px solid #2563eb;padding:12px 16px;background:#fff;border-radius:4px;margin:0;color:#374151;line-height:1.6">
                ${message.replace(/\n/g, "<br>")}
              </blockquote>
              <p style="margin-top:20px;font-size:13px;color:#6b7280">Responda diretamente a este email para contatar ${name}.</p>
            </div>
          </div>
        `,
      });

      // Confirmação automática para o remetente
      await transporter.sendMail({
        from: `"Lucas André" <${smtpUser}>`,
        to: email,
        replyTo: "lucas@anacron.com.br",
        subject: `Recebi seu contato, ${name}`,
        headers: { "X-Priority": "3", "Importance": "Normal" },
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1f2937">
            <div style="background:linear-gradient(135deg,#1e40af,#7c3aed);padding:32px;border-radius:8px 8px 0 0;text-align:center">
              <h1 style="color:#fff;margin:0;font-size:22px">Mensagem recebida!</h1>
              <p style="color:#c7d2fe;margin:8px 0 0;font-size:14px">Entrarei em contato em breve</p>
            </div>
            <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
              <p style="margin-top:0">Olá, <strong>${name}</strong>!</p>
              <p style="line-height:1.7;color:#374151">Recebi sua mensagem e já está na minha fila de leitura. Responderei em até <strong>24 horas úteis</strong> com uma resposta personalizada para o seu caso.</p>

              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:16px;margin:20px 0">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#1e40af;text-transform:uppercase;letter-spacing:.05em">Sua mensagem</p>
                <p style="margin:0;color:#374151;line-height:1.6;font-style:italic">"${message.replace(/\n/g, "<br>")}"</p>
              </div>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">

              <p style="margin:0 0 4px;font-weight:600">Lucas André</p>
              <p style="margin:0 0 16px;color:#6b7280;font-size:14px">Full Stack Developer · 10+ anos de experiência</p>

              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#6b7280">Portfólio</td>
                  <td style="padding:4px 0;font-size:14px"><a href="https://portfolio.anacron.com.br:21017" style="color:#2563eb">portfolio.anacron.com.br</a></td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#6b7280">LinkedIn</td>
                  <td style="padding:4px 0;font-size:14px"><a href="https://linkedin.com/in/lucas-andre-fernando" style="color:#2563eb">lucas-andre-fernando</a></td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#6b7280">WhatsApp</td>
                  <td style="padding:4px 0;font-size:14px"><a href="https://wa.me/5531995420887" style="color:#2563eb">+55 (31) 99542-0887</a></td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:14px;color:#6b7280">Email</td>
                  <td style="padding:4px 0;font-size:14px"><a href="mailto:lucas@anacron.com.br" style="color:#2563eb">lucas@anacron.com.br</a></td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;text-align:center">Esta é uma confirmação automática. Para urgências, entre em contato pelo WhatsApp.</p>
            </div>
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
