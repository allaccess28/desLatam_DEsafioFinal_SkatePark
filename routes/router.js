import express from "express";
import { home, loginForm, registerForm, participants } from "../controller/controller.js";
const router = express.Router();

router.get("/", home);
router.get("/login", loginForm);
router.get("/register", registerForm);
router.get("/participants", participants);




export default router;