import { Router } from "express";
const router = Router();
import { getCurrentUser } from "../controllers/userController.js";

// Routes for users

router.get("/current-user", getCurrentUser);

export default router;
