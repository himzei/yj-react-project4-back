import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const kakaoLogin = async (req, res) => {
  try {
    // Access Token 받는 코드
    const KAKAO_BASE_PATH = "https://kauth.kakao.com/oauth/token";
    const config = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT,
      code: req.body.code,
      redirect_uri: process.env.REDIRECT_URI,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${KAKAO_BASE_PATH}?${params}`;

    const data = await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
    const tokenRequest = await data.json();

    // 유저 정보 받는 코드
    if ("access_token" in tokenRequest) {
      const { access_token } = tokenRequest;
      const userRequest = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userData = await userRequest.json();

      const {
        kakao_account: {
          profile: { nickname, thumbnail_image_url },
          email,
        },
      } = userData;
      console.log(nickname, thumbnail_image_url, email);

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        const accessToken = jwt.sign(
          {
            id: existingUser._id,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "24h",
          }
        );
        const refreshToken = jwt.sign(
          {
            id: existingUser._id,
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
        return res.status(200).json({ ok: true });
      } else {
        const user = await User.create({
          name: nickname,
          username: nickname,
          email: email,
          password: "",
          socialOnly: true,
          avatarUrl: thumbnail_image_url,
        });

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
        return res.status(200).json({ ok: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });
    res.cookie("refreshToken", "", {
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });

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

    res.status(200).json({
      ok: true,
      email: userData.email,
      username: userData.username,
      avatarUrl: userData.avatarUrl,
    });
  } catch (error) {
    res.status(200).json({ ok: false, message: "로그인이 실패" });
  }
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(401)
      .json({ ok: "false", message: "해당하는 유저가 없습니다." });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res
      .status(401)
      .json({ ok: "false", message: "이메일/패스워드가 다릅니다." });
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

    res.status(200).json({ ok: "true" });
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

export const confrimUsername = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(200)
        .json({ ok: false, message: "압력하신 아이디는 이미 존재합니다." });
    }
    return res
      .status(200)
      .json({ ok: true, message: "해당 아이디는 사용할 수 있습니다." });
  } catch (error) {
    res.status(500).json({ ok: "false", error: `에러가 발생햇씁니다.` });
  }
};
