import express from "express";
import { createPost, deletePost, updatePost } from "../controllers/Post.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyUser, createPost);
router.delete("/:id", verifyUser, deletePost);
router.put("/:id", verifyUser, updatePost);

export default router;
