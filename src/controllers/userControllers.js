import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.cookie("refreshToken", "");

    res.status(200).json({ ok: true, message: "로그아웃 성공" });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

export const loginSuccess = async (req, res) => {
  try {
    const token = req.cookies?.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userData = await User.findOne({ _id: data.id });

    res
      .status(200)
      .json({ ok: true, email: userData.email, username: userData.username });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ ok: "error", error: "해당하는 유저가 없습니다." });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.json({ ok: "error", error: "이메일/패스워드가 다릅니다." });
  }

  try {
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });

    res.cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false });
  }
};

export const postJoin = async (req, res) => {
  const { password, name, username, password2 } = req.body;

  console.log(password, password2, name, username);

  if (password !== password2) {
    res.json({ ok: "false", error: "입력하신 패스워드가 다릅니다." });
  }

  // const exists = await User.exists({ $or: [{ username }, { email }] });
  // if (exists) {
  //   res.json({ ok: "false", error: "username/email 이 존재하지 않습니다." });
  // }

  try {
    await User.create({
      username,
      name,
      password,
      createdAt: Date.now(),
    });
    res.json({ ok: "true" });
  } catch (error) {
    res.status(500).json({ ok: "false", error: `에러가 발생햇씁니다.` });
  }
};
