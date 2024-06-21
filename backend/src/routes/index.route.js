// Import necessary modules
import express from "express";
import multer from "multer";

// Create a router instance
const router = express.Router();
const storage = multer.memoryStorage()

// Import controllers
import { handleGetReq, handlePostReq } from "../controllers/index.controller.js";

// Configure multer for file uploads
const upload = multer({ storage });


// Define routes
router.get("/", handleGetReq);
router.post("/", /* our field for getting files */ upload.array('files'), handlePostReq);

export default router;