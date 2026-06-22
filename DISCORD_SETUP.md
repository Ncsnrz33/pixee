# Configuração do Discord Webhook - Pixee

## O que é?
O webhook do Discord permite que os dados do formulário de cadastro sejam enviados automaticamente para um canal do seu servidor Discord em tempo real.

## Como Configurar

### 1. Criar o Webhook no Discord

1. Abra seu servidor Discord
2. Clique com botão direito no canal onde quer receber os cadastros
3. Selecione **"Editar canal"**
4. Vá para **"Integrações"** (ou **"Webhooks"** em versões antigas)
5. Clique em **"Criar Webhook"** (ou **"Novo Webhook"**)
6. Dê um nome (ex: "Pixee Cadastros")
7. Clique em **"Copiar URL do Webhook"**

### 2. Configurar Localmente (Testes)

1. Na raiz do projeto, crie um arquivo `.env.local`
2. Adicione:
```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_ID/SEU_TOKEN
```
3. Reinicie o servidor dev

### 3. Configurar na Netlify (Produção)

1. Vá para seu projeto na Netlify
2. Clique em **"Site Settings"**
3. Vá para **"Build & Deploy"** → **"Environment"**
4. Clique em **"Edit variables"**
5. Adicione uma nova variável:
   - **Key:** `DISCORD_WEBHOOK_URL`
   - **Value:** Cole a URL completa do webhook
6. Clique em **"Save"**
7. Faça um novo deploy

## Teste

1. Acesse `/cadastro`
2. Preencha o formulário com dados de teste
3. Clique em "Começar a Ganhar"
4. Verifique se a mensagem apareceu no canal Discord

## Segurança

⚠️ **IMPORTANTE:** Nunca compartilhe a URL do webhook publicamente. Qualquer pessoa com a URL pode enviar mensagens para seu canal.

Se a URL vazar, delete o webhook e crie um novo.

## Solução de Problemas

- **Mensagem não aparece no Discord?**
  - Verifique se a URL está correta
  - Verifique se o webhook ainda existe (não foi deletado)
  - Verifique os logs da Netlify

- **Erro 401 ou 403?**
  - A URL pode estar expirada ou incorreta
  - Crie um novo webhook

- **Erro 400?**
  - Verifique se os dados do formulário estão sendo enviados corretamente
