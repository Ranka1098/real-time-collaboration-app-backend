import userModel from "../../model/User.js";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please use a different email.",
      });
    }

    if (password.length < 6 || password.length > 20) {
      return res
        .status(400)
        .json({ message: "password within 6 to 20 character" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: randomAvatar,
    });

    // const token = jwt.sign(
    //   { id: newUser._id, email: newUser.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "7d" }
    // );

    // // Send it in httpOnly cookie
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 24 * 7 * 60 * 60 * 1000,
    // });

    res
      .status(201)
      .json({ message: "new user created successfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default signup;
