import express from "express";
import { home, loginForm, registerForm, participants, addSkater, getSkaters, login, dataSkaters, admin} from "../controller/controller.js";
const router = express.Router();

router.get("/", home);
router.get("/login", loginForm);
router.get("/register", registerForm);
router.get("/participants", participants);
router.get("/datos", dataSkaters);
router.get("/admin", admin);

router.post("/register/add", addSkater);
router.post("/login", login);


export default router;