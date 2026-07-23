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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Anuj
 *               email:
 *                 type: string
 *                 example: anuj@gmail.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 */
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

