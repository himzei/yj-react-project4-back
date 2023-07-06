import express from "express";
import {
  rentalNotice,
  rentalNoticeDetail,
  rentalNoticeDetailHits,
  rentalNoticeWrite,
} from "../controllers/rentalControllers";

const rentalRouter = express.Router();

rentalRouter.get("/notice", rentalNotice);
rentalRouter.post("/notice-write", rentalNoticeWrite);
rentalRouter
  .route("/notice/:id")
  .get(rentalNoticeDetail)
  .put(rentalNoticeDetailHits);

export default rentalRouter;
