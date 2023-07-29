"use strict";

require("dotenv/config");
require("./db");
require("./models/rentalNotice");
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _rentalRouter = _interopRequireDefault(require("./routers/rentalRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _foodsRouter = _interopRequireDefault(require("./routers/foodsRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = process.env.PORT;
var app = (0, _express["default"])();
var corsOptions = {
  origin: ["http://localhost:3000", "https://bejewelled-melba-55c01e.netlify.app", "https://web-yeosu-expo-web-kvmh2mljps546n.sel4.cloudtype.app", "https://www.hamo.fun", "https://hamo.fun"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200
};

// 미들웨어
app.use((0, _cors["default"])(corsOptions));
app.use((0, _morgan["default"])("dev"));
app.use((0, _cookieParser["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use("/rental", _rentalRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/api/foods", _foodsRouter["default"]);
var handleListening = function handleListening() {
  return console.log("Server listening on port http://localhost:".concat(PORT));
};
app.listen(PORT, handleListening);