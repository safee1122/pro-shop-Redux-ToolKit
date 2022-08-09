import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  refreshToken,
  userLogout,
  getUser,
} from "../controllers/userController.js";
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/refreshToken").get(refreshToken);
router.route("/logout").get(protect, userLogout);
router.route("/").post(registerUser);
router.route("/").get(protect, admin, getUser);

export default router;
