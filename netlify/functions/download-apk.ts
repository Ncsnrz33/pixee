import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  try {
    // URL do APK hospedado
    const apkUrl = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621133054/KdmFVnvzYeYzdSfC.apk";

    // Fazer fetch do arquivo
    const response = await fetch(apkUrl);

    if (!response.ok) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "APK não encontrado" }),
      };
    }

    // Obter o buffer do arquivo
    const buffer = await response.arrayBuffer();

    // Retornar com headers corretos para download
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="Pixee.apk"',
        "Content-Length": buffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400",
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Erro ao fazer download do APK:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao fazer download do APK" }),
    };
  }
};

export { handler };
