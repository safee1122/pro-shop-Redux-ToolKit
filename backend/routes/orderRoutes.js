import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  payOrder,
  updateOrderToPaid,
} from "../controllers/orderController.js";
router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/pay").get(protect, payOrder);

export default router;
