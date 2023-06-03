import express from "express";
import {
  login,
  register,
  logout,
  changePassword,
} from "../controllers/AuthController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.put("/change-password", verifyUser, changePassword);

export default router;
