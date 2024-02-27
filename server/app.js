import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import cookieParser from "cookie-parser";

const app = express();

import dotenv from "dotenv";
dotenv.config();

// Middleware
app.use(json());
app.use(cookieParser());

// Connect to MongoDB
import connectDB from "./database/db.js";

// Routes
import expenseRouter from "./routers/expenseRouter.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import ggsRouter from "./routers/ggsRouter.js";
import creditRouter from "./routers/creditRouter.js";

app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/ggs", ggsRouter);
app.use("/api/v1/credits", creditRouter);

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Error Handler Middleware
import errorHandlerMiddleware from "./middleware/errorHandleMiddleware.js";
app.use(errorHandlerMiddleware);

// Socket Handling
import { authenticateUser } from "./middleware/authMiddleware.js";
import { task } from "./controllers/creditController.js";

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

task.start();

start();
