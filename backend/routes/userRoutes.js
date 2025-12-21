import express from "express";

import { userLogin } from "../controllers/accountControllers/userLogin.js";
import { userSignup } from "../controllers/accountControllers/userSignup.js";
import { forgotPassword, resetPassword} from "../controllers/accountControllers/forgotPassword.js";
import { getAllSkills, getUserSkills, updateUserSkills } from "../controllers/profileController/skill.js";
import { userLogout } from "../controllers/accountControllers/userLogout.js";
const router = express.Router();
//signup login page api
router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", userLogout);

//skills api  
router.get("/skills/options", getAllSkills);
router.get("/skills/:userId", getUserSkills);
router.post("/skills", updateUserSkills);

export default router;