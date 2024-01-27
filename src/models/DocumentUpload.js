import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create a new schema for uploaded documents
const DocumentUploadSchema = new Schema({
  title: String,
  description: String,
  fileName: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  embedding: [Number],
});

// Create a model from the schema
const UploadedDocument = mongoose.model(
  "UploadedDocument",
  DocumentUploadSchema
);

export default UploadedDocument;
