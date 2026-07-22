import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { registerSchema,loginSchema } from "../validations/authValidation.js";
import { registerUser, 
         loginUser,
         getProfile
} from "../controllers/authController.js";
//This is the name of the function which we are importing.
const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    registerUser
);

router.post(
    "/login",
    validate(loginSchema),
    loginUser
);

router.get("/profile", authMiddleware, getProfile);
export default router;

