import RentalNotice from "../models/rentalNotice";

export const rentalNotice = async (req, res) => {
  try {
    const lists = await RentalNotice.find({}).sort({ createdAt: -1 });
    const counts = await RentalNotice.count();
    return res.json({ lists, counts });
  } catch (error) {
    console.log(error);
    res.json({ ok: "false", error: `에러가 발생했습니다. ${error.code}` });
  }
};

export const rentalNoticeWrite = async (req, res) => {
  const { title, description, writer } = req.body;
  if (title === "" || description === "" || writer === "") {
    res.json({ ok: "false", error: "필수 입력사항을 작성하셔야 합니다. " });
  }
  try {
    await RentalNotice.create({
      title,
      description,
      writer,
      createdAt: Date.now(),
    });
    res.json({ ok: "true" });
  } catch (error) {
    console.log(error);
    res.json({ ok: "false", error: `에러가 발생했습니다. ${error.code}` });
  }
};

export const rentalNoticeDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await RentalNotice.find({});
    const detail = await details.find((post) => post._id.toString() === id);
    if (!detail) throw new Error("해당하는 포스트를 찾을 수 었어요 ");
    const index = details.indexOf(detail);
    const next = index > 0 ? details[index - 1] : null;
    const prev = index < details.length ? details[index + 1] : null;

    res.json({ detail, next, prev });
  } catch (error) {
    console.log(error);
    res.json({ ok: "false", error: `에러가 발생했습니다. ${error.code}` });
  }
};

export const rentalNoticeDetailHits = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await RentalNotice.findOne({ _id: id });
    const hits = detail.hits + 1;
    await RentalNotice.updateOne({ hits });
  } catch (error) {
    console.log(error);
    res.json({ ok: "false", error: `에러가 발생했습니다. ${error.code}` });
  }
};
