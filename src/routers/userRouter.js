import express from "express";
import {
  postRegisterMember,
  postUsernameSignIn,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

// 회원가입
userRouter.post("/register", postRegisterMember);
// 로그인
userRouter.post("/signin", postUsernameSignIn);

export default userRouter;
