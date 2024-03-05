import { Router } from "express";
const router = Router();
import {
  getIncomeCategory,
  updateExpenseSheet,
  updateIncomeSheet,
  getExpenseCategory,
  updateExpenseSheetBatch,
} from "../controllers/ggsController.js";

// Routes for users
router.route("/incomecat").get(getIncomeCategory);
router.route("/expensecat").get(getExpenseCategory);
router.post("/income", updateIncomeSheet);
router.post("/expense", updateExpenseSheet);
router.post("/expenses", updateExpenseSheetBatch);

export default router;
