import { Router } from "express";
import { getUserData, login, signup } from "../controller/user.js";
import isAuth from "../middleware/auth.js";

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/me', isAuth, getUserData);

export default router;