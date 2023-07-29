"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _foodsControllers = require("../controllers/foodsControllers.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var foodsRouter = _express["default"].Router();
foodsRouter.get("/joongu", _foodsControllers.getJoonguFoods);
var _default = foodsRouter;
exports["default"] = _default;