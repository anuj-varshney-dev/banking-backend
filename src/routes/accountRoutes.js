import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAccount,
        getAccounts,
        depositMoney,
        transferMoney
 } from "../controllers/accountController.js";
const router=express.Router();

router.post("/create", authMiddleware, createAccount);

export default router;

