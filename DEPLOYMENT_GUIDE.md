# Guia Completo de Deploy Automático

## 🎯 Visão Geral

Seu projeto está configurado com **CI/CD automático** usando GitHub Actions. Toda vez que você faz `push` ou `merge` na branch `main`, o sistema:

1. ✅ Faz checkout do código
2. ✅ Instala dependências (pnpm)
3. ✅ Gera build de produção
4. ✅ Conecta via FTP na KingHost
5. ✅ Sincroniza arquivos para o servidor
6. ✅ Site atualizado automaticamente!

## 📊 Arquitetura do Fluxo

```
┌─────────────────────────────────────────────────────────────┐
│                     SEU COMPUTADOR                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  $ git push origin main                                 │ │
│  └────────────────────┬────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   GITHUB (Repositório)                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Recebe push → Dispara GitHub Actions                  │ │
│  └────────────────────┬────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              GITHUB ACTIONS (Workflow)                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  1. Setup Node.js                                       │ │
│  │  2. Install pnpm                                        │ │
│  │  3. pnpm install                                        │ │
│  │  4. pnpm build (gera /dist/)                           │ │
│  │  5. Deploy via FTP                                      │ │
│  └────────────────────┬────────────────────────────────────┘ │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              KINGHOST (Servidor FTP)                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  /home/anacron/                                         │ │
│  │  ├── index.html                                         │ │
│  │  ├── assets/                                            │ │
│  │  └── favicon.ico                                        │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│          ANACRON.COM.BR (Seu Domínio)                       │
│  ✅ Site Atualizado e Online!                              │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Como Usar

### Desenvolvimento Local

```bash
# 1. Clonar o repositório
git clone https://github.com/lucasandrefernando/lucas-portfolio.git
cd lucas-portfolio

# 2. Instalar dependências
pnpm install

# 3. Iniciar servidor de desenvolvimento
pnpm dev

# 4. Abrir no navegador
# http://localhost:3000
```

### Fazendo Alterações

```bash
# 1. Criar uma branch para sua feature
git checkout -b feature/nova-secao

# 2. Fazer suas alterações
# ... edite os arquivos ...

# 3. Testar localmente
pnpm dev

# 4. Fazer commit
git add .
git commit -m "feat: adiciona nova seção"

# 5. Fazer push
git push origin feature/nova-secao

# 6. Criar Pull Request no GitHub
# - Vá para: https://github.com/lucasandrefernando/lucas-portfolio
# - Clique em "Compare & pull request"
# - Revise as mudanças
# - Clique em "Create pull request"

# 7. Fazer merge para main
# - Clique em "Merge pull request"
# - ✅ GitHub Actions começa automaticamente!
```

### Ou Fazer Push Direto para Main (Mais Rápido)

```bash
# 1. Fazer alterações
# ... edite os arquivos ...

# 2. Fazer commit
git add .
git commit -m "feat: atualiza seção de projetos"

# 3. Fazer push para main
git push origin main

# ✅ GitHub Actions dispara automaticamente!
```

## 📋 Monitorar o Deploy

### Ver Status no GitHub

1. Acesse: https://github.com/lucasandrefernando/lucas-portfolio
2. Clique em **Actions**
3. Veja o workflow em execução
4. Clique no workflow para ver detalhes

### Exemplo de Workflow Bem-Sucedido

```
✅ Build and Deploy to KingHost FTP
   ├─ ✅ Checkout code (0.5s)
   ├─ ✅ Setup Node.js (2s)
   ├─ ✅ Install pnpm (0.3s)
   ├─ ✅ Install dependencies (15s)
   ├─ ✅ Build project (10s)
   ├─ ✅ Deploy to KingHost via FTP (5s)
   └─ ✅ Deployment Status (0.1s)

Total: ~33 segundos
```

### Exemplo de Workflow com Erro

```
❌ Build and Deploy to KingHost FTP
   ├─ ✅ Checkout code
   ├─ ✅ Setup Node.js
   ├─ ✅ Install pnpm
   ├─ ✅ Install dependencies
   ├─ ❌ Build project (erro de TypeScript)
   └─ ⏭️ Deploy to KingHost via FTP (não executado)
```

## 🔍 Verificar Deploy no Servidor

### Via FTP (Local)

```bash
# Conectar ao servidor FTP
ftp ftp.anacron.com.br

# Login
Name: anacron
Password: Super.123

# Navegar para o diretório
cd /home/anacron

# Listar arquivos
ls -la

# Sair
quit
```

### Via Navegador

1. Acesse: https://anacron.com.br
2. Verifique se as mudanças aparecem
3. Abra o DevTools (F12) e verifique o console

## 🐛 Troubleshooting

### Problema: Workflow falha com erro de build

**Solução:**
1. Verifique o erro no GitHub Actions
2. Corrija o erro localmente
3. Faça commit e push novamente

```bash
# Testar build localmente
pnpm build

# Se houver erro, corrija
# Depois faça push
git add .
git commit -m "fix: corrige erro de build"
git push origin main
```

### Problema: Deploy falha com erro de FTP

**Solução:**
1. Verifique os secrets no GitHub
2. Confirme as credenciais FTP
3. Teste a conexão FTP manualmente

```bash
# Testar conexão FTP
ftp ftp.anacron.com.br
# Digite: anacron
# Digite: Super.123
# Se conectar, os secrets estão corretos
```

### Problema: Site não atualiza após deploy

**Solução:**
1. Limpe o cache do navegador (Ctrl+Shift+Del)
2. Verifique se o workflow completou com sucesso
3. Aguarde 1-2 minutos para propagação de DNS

```bash
# Limpar cache do navegador
# Chrome/Firefox/Edge: Ctrl+Shift+Del
# Safari: Cmd+Shift+Del

# Ou use incógnito
# Chrome: Ctrl+Shift+N
# Firefox: Ctrl+Shift+P
```

## 📝 Estrutura de Arquivos Após Deploy

```
/home/anacron/
├── index.html                    # Página principal
├── favicon.ico                   # Ícone do site
├── assets/
│   ├── index-ABC123.js          # JavaScript compilado
│   ├── index-ABC123.css         # CSS compilado
│   └── ...
└── ...
```

## 🔐 Segurança

**Boas Práticas:**
- ✅ Nunca compartilhe seu token GitHub
- ✅ Nunca faça commit de credenciais
- ✅ Use secrets do GitHub para dados sensíveis
- ✅ Revise PRs antes de fazer merge
- ✅ Mantenha dependências atualizadas

## 📚 Comandos Úteis

```bash
# Ver histórico de commits
git log --oneline

# Ver branches
git branch -a

# Deletar branch local
git branch -d feature/nome

# Deletar branch remoto
git push origin --delete feature/nome

# Ver status
git status

# Ver diff
git diff

# Fazer revert de um commit
git revert <commit-hash>
```

## ✅ Checklist de Verificação

- [ ] Repositório criado no GitHub
- [ ] Código faz push com sucesso
- [ ] Secrets configurados no GitHub
- [ ] Workflow executa sem erros
- [ ] Arquivos aparecem no servidor FTP
- [ ] Site atualiza em anacron.com.br
- [ ] Cache do navegador foi limpo

## 🎉 Pronto!

Seu deploy automático está 100% funcional! 

**Próximas vezes que você fizer push para `main`:**
1. GitHub Actions dispara automaticamente
2. Faz build do projeto
3. Conecta via FTP
4. Atualiza o servidor
5. Seu site está online! 🚀

---

**Dúvidas?** Consulte a documentação do GitHub Actions ou entre em contato.

**Última atualização:** Fevereiro de 2026
