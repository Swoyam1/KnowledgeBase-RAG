import express from "express";

import UploadedDocument from "../models/DocumentUpload.js";
import { createEmbedding } from "../utils/createEmbedding.js";
import processAllPDFsInFolder from "../utils/parsePDF.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pdfFolderPath = "../pdf";
    const text = await processAllPDFsInFolder(pdfFolderPath);
    const embedding = await createEmbedding(text);
    const newDoc = new UploadedDocument({
      description: text,
      embedding: embedding,
    });

    const savedDoc = await newDoc.save();
    res.status(201).json({
      message: "Document uploaded successfully",
      document: savedDoc,
    });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
});

export default router;
