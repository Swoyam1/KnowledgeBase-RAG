import { PdfReader } from "pdfreader";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

async function processAllPDFsInFolder(folderPath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pdfFolder = path.join(__dirname, folderPath);

  const files = fs.readdirSync(pdfFolder);

  // Use Promise.all with map to process PDF files concurrently
  const textPromises = files
    .filter((file) => file.endsWith(".pdf"))
    .map(async (file) => {
      const pdfFilePath = path.join(pdfFolder, file);
      const textData = await processPDFFile(pdfFilePath);
      return textData;
    });

  // Wait for all promises to resolve
  const textChunks = await Promise.all(textPromises);

  // Combine the text chunks into a single string
  return textChunks.join("");
}

async function processPDFFile(pdfFilePath) {
  return new Promise((resolve, reject) => {
    const textChunks = [];

    new PdfReader().parseFileItems(pdfFilePath, (err, item) => {
      if (item?.text) {
        textChunks.push(item.text);
      } else if (err) {
        console.log("Error Parsing!");
        reject(err);
      } else if (!item) resolve(textChunks.join(""));
    });
  });
}

export default processAllPDFsInFolder;
