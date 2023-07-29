"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userControllers = require("../controllers/userControllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.post("/signup", _userControllers.postJoin);
userRouter.post("/login", _userControllers.postLogin);
userRouter.get("/login/success", _userControllers.loginSuccess);
userRouter.post("/logout", _userControllers.logout);
userRouter.post("/kakao", _userControllers.kakaoLogin);
userRouter.get("/usernameDeDuple", _userControllers.confrimUsername);
var _default = userRouter;
exports["default"] = _default;