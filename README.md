# Lucas André - Portfólio Full Stack

Landing page profissional de portfólio para Lucas André Fernando dos Santos, desenvolvedor Full Stack com mais de 10 anos de experiência em tecnologia.

## 🚀 Sobre o Projeto

Este é um portfólio moderno desenvolvido em **React 19** com **Tailwind CSS 4**, apresentando:

- **Hero Section**: Introdução impactante com call-to-actions
- **About Section**: Timeline da trajetória profissional
- **Skills Section**: Habilidades técnicas com filtros por categoria
- **Experience Section**: Histórico profissional detalhado
- **Projects Section**: Portfólio de projetos destacados
- **Contact Section**: Formulário de contato e links sociais
- **Responsive Design**: 100% otimizado para mobile, tablet e desktop

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 10+

## 🔧 Instalação

```bash
# Clonar o repositório
git clone https://github.com/lucasandrefernando/lucas-portfolio.git
cd lucas-portfolio

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

## 📦 Build para Produção

```bash
# Gerar build otimizado
pnpm build

# Visualizar build localmente
pnpm preview
```

Os arquivos de produção estarão em `/dist`

## 🚀 Deploy Automático

Este projeto utiliza **GitHub Actions** para deploy automático via FTP na KingHost.

### Configuração

O workflow está configurado para:
1. Fazer build automático ao push/merge na branch `main`
2. Conectar via FTP na hospedagem KingHost
3. Sincronizar arquivos do diretório `dist/`
4. Manter o deploy sincronizado sem intervenção manual

### Secrets Necessários (GitHub)

Configure os seguintes secrets no repositório GitHub:

```
FTP_HOST=ftp.anacron.com.br
FTP_USER=anacron
FTP_PASSWORD=Super.123
FTP_PATH=/home/anacron
```

### Como Adicionar Secrets

1. Vá para: `Settings` → `Secrets and variables` → `Actions`
2. Clique em `New repository secret`
3. Adicione cada secret com o nome e valor correspondente

## 📝 Estrutura do Projeto

```
lucas-portfolio/
├── client/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Contextos React
│   │   ├── pages/           # Páginas
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   ├── public/              # Arquivos estáticos
│   └── index.html           # HTML principal
├── server/                  # Servidor Express (placeholder)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🔄 Workflow CI/CD

```
┌─────────────────┐
│  Push/Merge     │
│  na branch main │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│ Workflow Start  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Install Deps    │
│ (pnpm install)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Build Project   │
│ (pnpm build)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deploy via FTP  │
│ (KingHost)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Deploy Complete │
│ Site Updated    │
└─────────────────┘
```

## 📧 Contato

- **Email**: lucasandre.sanos@gmail.com
- **GitHub**: https://github.com/lucasandrefernando
- **LinkedIn**: https://linkedin.com/in/lucas-andre-fernando
- **WhatsApp**: +55 (31) 99542-0887

## 📄 Licença

Este projeto é de uso pessoal e está protegido.

## 🙏 Agradecimentos

Desenvolvido com ❤️ usando React, Tailwind CSS e Vite.

---

**Última atualização**: Fevereiro de 2026
