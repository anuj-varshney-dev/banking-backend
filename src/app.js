import express from "express";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();

app.use(express.json());
setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes); 
app.use(errorHandler); // this should come always at last 

export default app;