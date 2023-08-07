import "dotenv/config";
import "./db.js";
import express from "express";
import morgan from "morgan";
import rentalRouter from "./routers/rentalRouter.js";
import cors from "cors";
import foodsRouter from "./routers/foodsRouter.js";

const PORT = 8080;
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://merry-starship-9d7e2f.netlify.app",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/rental", rentalRouter);
app.use("/api/foods", foodsRouter);

const handleListening = () =>
  console.log(`😍Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
