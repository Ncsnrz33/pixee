import { Handler } from "@netlify/functions";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  tipoPix: string;
}

const handler: Handler = async (event) => {
  // Apenas POST é permitido
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data: FormData = JSON.parse(event.body || "{}");

    // Validações básicas
    if (!data.nome || !data.email || !data.telefone || !data.cpf || !data.tipoPix) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Dados incompletos" }),
      };
    }

    // Formatar dados para o Discord
    const embed = {
      title: "Novo Cadastro - Pixee",
      color: 0x10b981,
      fields: [
        {
          name: "Nome Completo",
          value: data.nome,
          inline: false,
        },
        {
          name: "Email",
          value: data.email,
          inline: true,
        },
        {
          name: "Telefone",
          value: data.telefone,
          inline: true,
        },
        {
          name: "CPF do Destinatário",
          value: data.cpf,
          inline: true,
        },
        {
          name: "Tipo de Chave PIX",
          value: data.tipoPix.charAt(0).toUpperCase() + data.tipoPix.slice(1),
          inline: true,
        },
      ],
      footer: {
        text: `Cadastro realizado em ${new Date().toLocaleString("pt-BR")}`,
      },
      timestamp: new Date().toISOString(),
    };

    // Enviar para Discord
    const response = await fetch(DISCORD_WEBHOOK_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      console.error("Erro ao enviar para Discord:", response.statusText);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erro ao processar cadastro" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Cadastro realizado com sucesso" }),
    };
  } catch (error) {
    console.error("Erro:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao processar requisição" }),
    };
  }
};

export { handler };
