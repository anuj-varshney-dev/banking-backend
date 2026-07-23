import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAccount,
        getAccounts,
        depositMoney,
        withdrawMoney,
        transferMoney
 } from "../controllers/accountController.js";
const router=express.Router();

router.post("/create", authMiddleware, createAccount);
router.post("/deposit", authMiddleware, depositMoney);
router.post("/withdraw", authMiddleware, withdrawMoney);
router.post("/transfer", authMiddleware, transferMoney);

export default router;

