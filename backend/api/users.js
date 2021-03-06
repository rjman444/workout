const express = require("express");
const router = express.Router();
const jwtDecode = require("jwt-decode");
const User = require("../models/user");
const { hashPassword, createToken, verifyPassword } = require("../util");

// Signup Route

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      username: req.body.username,
      password: hashedPassword,
    };

    const existingUser = await User.findOne({
      username: userData.username,
    }).lean();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const { password, ...rest } = savedUser._doc;
      const userInfo = Object.assign({}, { ...rest });

      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.json({
        message: "User created",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      return res.status(400).json({
        message: "There was a problem creating your account",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "There was a problem creating your account",
    });
  }
});

// Login Route

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
  }).lean();

  if (!user) {
    return res.status(403).json({
      message: "Wrong username",
      username: req.body,
      password,
    });
  }

  const passwordValid = await verifyPassword(password, user.password);

  if (passwordValid) {
    const { password, ...rest } = user;
    const userInfo = Object.assign({}, { ...rest });

    const token = createToken(userInfo);

    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      message: "Authentication successful!",
      token,
      userInfo,
      expiresAt,
    });
  } else {
    res.status(403).json({
      message: "Wrong username or password",
    });
  }
});

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

// Delete User Route

router.delete("/:username", (req, res) => {
  User.deleteOne({ username: req.params.username })
    .then(() => res.json({ message: "Deleted user " + req.params.username }))
    .catch((error) => console.log(error));
});

// Authenticate Route

module.exports = router;
