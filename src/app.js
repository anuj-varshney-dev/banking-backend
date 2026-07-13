import express from "express";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);

export default app;