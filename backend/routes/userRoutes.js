import express from "express";

import { userLogin } from "../controllers/accountControllers/userLogin.js";
import { userSignup } from "../controllers/accountControllers/userSignup.js";
import { forgotPassword, resetPassword} from "../controllers/accountControllers/forgotPassword.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword)
export default router;