import "dotenv/config";
import "./db";
import "./models/rentalNotice";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rentalRouter from "./routers/rentalRouter";
import userRouter from "./routers/userRouter";

const PORT = process.env.PORT;
const app = express();

let corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://bejewelled-melba-55c01e.netlify.app",
    "https://web-yeosu-expo-web-kvmh2mljps546n.sel4.cloudtype.app",
    "https://www.hamo.fun",
    "https://hamo.fun",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};

// 미들웨어
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/rental", rentalRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
