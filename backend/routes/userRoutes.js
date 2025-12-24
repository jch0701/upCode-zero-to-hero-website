import express from "express";

import { userLogin } from "../controllers/accountControllers/userLogin.js";
import { userSignup } from "../controllers/accountControllers/userSignup.js";
import { forgotPassword, resetPassword} from "../controllers/accountControllers/forgotPassword.js";
import { getAllSkills, getMySkills, updateMySkills } from "../controllers/profileController/skill.js";
import { userLogout } from "../controllers/accountControllers/userLogout.js";
import { requireAuth } from "../controllers/profileController/requireAuth.js";
const router = express.Router();
//signup login page api
router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", userLogout);

//skills api  
router.get("/skills/options", getAllSkills);
router.get("/skills/me", requireAuth, getMySkills);
router.post("/skills/me", requireAuth, updateMySkills);

export default router;