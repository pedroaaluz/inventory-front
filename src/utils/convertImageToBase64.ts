import { promises as fs } from "fs";
import path from "path";

export const convertImageToBase64 = async (
  filePathOrUrl: string
): Promise<string> => {
  const isUrl =
    filePathOrUrl.startsWith("http://") || filePathOrUrl.startsWith("https://");

  if (isUrl) {
    const response = await fetch(filePathOrUrl);

    if (!response.ok) {
      throw new Error(`Erro ao baixar a imagem da URL: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const mimeType = response.headers.get("content-type") || "image/jpeg"; // Pega o tipo MIME
    return `data:${mimeType};base64,${base64Image}`;
  } else {
    const absolutePath = path.resolve(filePathOrUrl); // Resolve o caminho completo
    const fileBuffer = await fs.readFile(absolutePath);
    return fileBuffer.toString("base64");
  }
};
