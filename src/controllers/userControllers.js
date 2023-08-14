import User from "../models/user.js";

// 회원가입 컨트롤러
export const postRegisterMember = async (req, res) => {
  try {
    const { username, password, email, name, mobile, address2 } = req.body;
    const address = address2;
    const user = await User.create({
      username,
      password,
      name,
      email,
      mobile,
      address,
      createdAt: Date.now(),
    });
    res.json({ ok: "true", user });
  } catch (error) {
    console.log(error);
  }
};

// 로그인 컨트롤러
export const postUsernameSignIn = (req, res) => {
  const body = req.body;
  console.log(body);
};
