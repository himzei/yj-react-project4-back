import "dotenv/config";
import "./db";
import "./models/rentalNotice";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rentalRouter from "./routers/rentalRouter";
import userRouter from "./routers/userRouter";
import foodsRouter from "./routers/foodsRouter";

const PORT = process.env.PORT;
const app = express();

let corsOptions = {
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:3000",
    "https://bejewelled-melba-55c01e.netlify.app",
    "https://web-yeosu-expo-web-kvmh2mljps546n.sel4.cloudtype.app",
    "https://www.hamo.fun",
    "https://hamo.fun",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// 미들웨어
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/rental", rentalRouter);
app.use("/user", userRouter);
app.use("/api/foods", foodsRouter);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
