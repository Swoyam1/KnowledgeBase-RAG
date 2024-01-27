import { createEmbedding } from "../utils/createEmbedding.js";
import express from "express";
import PromptResponse from "../utils/createChat.js";
const router = express.Router();
import db from "../db/MongoDB.js";

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    // console.log(query);
    const embedding = await createEmbedding(query);
    // console.log(embedding);
    async function findSimilarDocuments(embedding) {
      try {
        const collectionName = "uploadeddocuments";
        const collection = db.collection(collectionName);
        const documents = await collection
          .aggregate([
            {
              $search: {
                knnBeta: {
                  vector: embedding,
                  // path is the path to the embedding field in the mongodb collection documentupload
                  path: "embedding",
                  // change k to the number of documents you want to be returned
                  k: 2,
                },
              },
            },
            {
              $project: {
                description: 1,
                score: { $meta: "searchScore" },
              },
            },
          ])
          .toArray();

        return documents;
      } catch (err) {
        console.error(err);
      }
    }

    const similarDocuments = await findSimilarDocuments(embedding);

    //console.log("similarDocuments: ", similarDocuments);

    // gets the document with the highest score
    const highestScoreDoc = similarDocuments.reduce((highest, current) => {
      return highest.score > current.score ? highest : current;
    });

    //console.log("highestScoreDoc", highestScoreDoc);

    const prompt = `Based on this context: ${highestScoreDoc.description} \n\n Query: ${query} \n\n Answer:`;

    const answer = await PromptResponse(prompt);
    console.log("answer: ", answer);
    res.send(answer);
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
});

export default router;
