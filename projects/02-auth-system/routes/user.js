import { Router } from "express";
import {
  getAllUser,
  getUserData,
  login,
  signUp,
  updateUser,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/me", getUserData);
userRouter.patch("/update", updateUser);
userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);

export default userRouter;
