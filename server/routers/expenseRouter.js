import { Router } from "express";
const router = Router();
import {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

// Routes for expenses
router.get("/", getAllExpenses);
router.post("/", authenticateUser, createExpense);
router.get("/:id", authenticateUser, getExpenseById);
router.put("/:id", authenticateUser, updateExpense);
router.delete("/:id", authenticateUser, deleteExpense);

export default router;
