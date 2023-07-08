import express from "express";
import {
  kakaoLogin,
  loginSuccess,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/signup", postJoin);
userRouter.post("/login", postLogin);
userRouter.get("/login/success", loginSuccess);
userRouter.post("/logout", logout);
userRouter.post("/kakao", kakaoLogin);

export default userRouter;
