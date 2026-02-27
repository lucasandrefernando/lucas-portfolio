# Configuração do GitHub Actions para Deploy Automático

Este guia explica como configurar o GitHub Actions para fazer deploy automático na KingHost via FTP.

## 📋 Pré-requisitos

1. Conta GitHub ativa
2. Repositório criado em: `https://github.com/lucasandrefernando/lucas-portfolio`
3. Credenciais FTP da KingHost (já fornecidas)

## 🔑 Passo 1: Adicionar Secrets no GitHub

Os **Secrets** são variáveis criptografadas que armazenam informações sensíveis (credenciais FTP).

### Como Adicionar:

1. Acesse seu repositório no GitHub
2. Vá para: **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione cada secret abaixo:

### Secrets Necessários:

| Nome | Valor |
|------|-------|
| `FTP_HOST` | `ftp.anacron.com.br` |
| `FTP_USER` | `anacron` |
| `FTP_PASSWORD` | `Super.123` |
| `FTP_PATH` | `/home/anacron` |

**Exemplo de adição:**
```
Nome: FTP_HOST
Valor: ftp.anacron.com.br
```

## 🚀 Passo 2: Entender o Workflow

O arquivo `.github/workflows/deploy.yml` contém a automação:

```yaml
name: Build and Deploy to KingHost FTP

on:
  push:
    branches:
      - main
```

**O que significa:**
- Toda vez que você faz `push` ou `merge` na branch `main`
- O GitHub Actions executa automaticamente:
  1. Faz checkout do código
  2. Instala dependências
  3. Gera o build de produção
  4. Conecta via FTP na KingHost
  5. Sincroniza os arquivos

## 📝 Passo 3: Fluxo de Uso

### Desenvolvimento Local

```bash
# 1. Clonar o repositório
git clone https://github.com/lucasandrefernando/lucas-portfolio.git
cd lucas-portfolio

# 2. Criar uma branch para sua feature
git checkout -b feature/nova-secao

# 3. Fazer alterações
# ... edite os arquivos ...

# 4. Testar localmente
pnpm dev

# 5. Fazer commit
git add .
git commit -m "Adiciona nova seção"

# 6. Fazer push
git push origin feature/nova-secao
```

### Merge para Main (Ativa Deploy)

```bash
# 1. Criar Pull Request no GitHub
# 2. Revisar as mudanças
# 3. Fazer merge para main

# OU via linha de comando:
git checkout main
git pull origin main
git merge feature/nova-secao
git push origin main
```

**Quando você faz push para `main`:**
- ✅ GitHub Actions começa automaticamente
- ✅ Faz build do projeto
- ✅ Conecta na KingHost via FTP
- ✅ Atualiza os arquivos no servidor
- ✅ Seu site está atualizado! 🎉

## 🔍 Monitorar o Deploy

### Ver Status do Workflow:

1. Vá para seu repositório no GitHub
2. Clique em **Actions**
3. Veja o histórico de execuções
4. Clique em um workflow para ver detalhes

### Exemplo de Status:

```
✅ Build and Deploy to KingHost FTP
   ├─ ✅ Checkout code
   ├─ ✅ Setup Node.js
   ├─ ✅ Install pnpm
   ├─ ✅ Install dependencies
   ├─ ✅ Build project
   ├─ ✅ Deploy to KingHost via FTP
   └─ ✅ Deployment Status
```

## 🐛 Troubleshooting

### Problema: Deploy falha com erro de autenticação

**Solução:**
1. Verifique se os secrets estão corretos
2. Confirme as credenciais FTP na KingHost
3. Teste a conexão FTP localmente:
   ```bash
   ftp ftp.anacron.com.br
   # Digite usuário: anacron
   # Digite senha: Super.123
   ```

### Problema: Arquivos não aparecem no servidor

**Solução:**
1. Verifique o caminho FTP: `/home/anacron`
2. Confirme que o build foi gerado: `/dist/`
3. Verifique os logs do workflow no GitHub Actions

### Problema: Workflow não executa ao fazer push

**Solução:**
1. Confirme que você fez push para a branch `main`
2. Verifique se o arquivo `.github/workflows/deploy.yml` existe
3. Vá para **Actions** e verifique se há erros

## 📊 Estrutura de Diretórios no Servidor

Após o deploy, seu servidor terá:

```
/home/anacron/
├── index.html
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── ...
├── favicon.ico
└── ...
```

## 🔐 Segurança

**Boas Práticas:**
- ✅ Nunca compartilhe seus secrets
- ✅ Use secrets do GitHub (não hardcode no código)
- ✅ Revise os PRs antes de fazer merge
- ✅ Mantenha as dependências atualizadas

## 📚 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action)
- [KingHost FTP Documentation](https://www.kinghost.com.br/)

## ✅ Checklist de Configuração

- [ ] Repositório criado no GitHub
- [ ] Secrets adicionados (FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_PATH)
- [ ] Arquivo `.github/workflows/deploy.yml` existe
- [ ] Testou fazer push para a branch `main`
- [ ] Verificou o workflow em GitHub Actions
- [ ] Confirmou que os arquivos foram atualizados no servidor

---

**Pronto!** Seu deploy automático está configurado. 🚀

Toda vez que você fizer push para `main`, o site será atualizado automaticamente!
