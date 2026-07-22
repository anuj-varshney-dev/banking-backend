import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateMiddleware } from "../middleware/validateMiddleware.js";
import { registerSchema } from "../validations/authValidation.js";
import { registerUser, 
         loginUser,
         getProfile
} from "../controllers/authController.js";
//This is the name of the function which we are importing.
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
export default router;

