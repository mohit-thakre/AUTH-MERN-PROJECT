const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userAuth = require("../middleware/userAuth");

router.post("/signup", async (req, res) => {
  const { userName, firstName, lastName, email, password, confirmPassword } =
    req.body;
  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "user already exists" });
  }

  if (password.length < 5 || password.length > 15) {
    return res.status(400).json({
      success: false,
      message: "password is weak it should be greater than 5 and less than 15",
    });
  }

  if (userName.length < 5 || userName.length > 15) {
    return res.status(400).json({
      success: false,
      message: "userName must be greater than 5 and less than 15",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirm password not mathched",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  });
  await newUser.save();
  return res
    .status(200)
    .json({ success: true, message: "user created successfull" });
});
router.post("/singin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "all fields are required" });
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "invalid credential" });
    }
    const payload = {
      email: checkUser.email,
      id: checkUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      id: checkUser._id,
      email: checkUser.email,
      token: token,
      message: "user login successful",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error at login", error });
  }
});

router.get("/getuser", userAuth, async (req, res) => {
  try {
    const { id } = req.userAuth;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User details found", data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving user details",
      error,
    });
  }
});

router.put("/updateProfile", userAuth, async (req, res) => {
  const { id } = req.userAuth;
  const { userName, firstName, lastName, email } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      userName,
      firstName,
      lastName,
      email,
    },
    { new: true }
  );
  if (!user) {
    return res.status(400).json({ success: false, message: "user not found" });
  }
  return res.status(200).json({
    success: true,
    message: "Profile Updated Successfull",
    data: user,
  });
});

router.delete("/deleteProfile", userAuth, async (req, res) => {
  const { id } = req.userAuth;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(400).json({ success: false, message: "user not found" });
  }
  return res.status(200).json({
    success: true,
    message: "Profile Deleted Successfull",
  });
});

router.put("/resetPassword", userAuth, async (req, res) => {
  const { id } = req.userAuth;
  const { password, oldPassword, confirmPassword } = req.body;

  if (!password || !oldPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Old password is incorrect" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
});

module.exports = router;
