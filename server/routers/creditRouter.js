//write credit router here
import { Router } from "express";

import {
  getAllCredits,
  createCredit,
} from "../controllers/creditController.js";

const router = Router();

router.route("/").get(getAllCredits).post(createCredit);

export default router;
