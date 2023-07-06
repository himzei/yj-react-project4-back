import mongoose from "mongoose";

const rentalNoticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  writer: String,
  hits: {
    type: Number,
    default: 0,
  },
});

const RentalNotice = mongoose.model("RentalNotice", rentalNoticeSchema);
export default RentalNotice;
