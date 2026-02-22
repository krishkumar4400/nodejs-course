import { Router } from "express";
import { getAllUser, login, signUp } from "../controllers/user.js";

const userRouter = Router();

userRouter.get('/', getAllUser);
userRouter.post('/sign-up', signUp);
userRouter.post('/login', login);

export default userRouter;