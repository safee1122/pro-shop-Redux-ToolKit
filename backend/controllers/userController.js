import asyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import generateToken from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    user.logIn();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.token,
      refreshToken: user.refreshToken,
    });
  } else {
    res.status(401);
    throw new Error("invalid auth");
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists && (await user.matchPassword(password))) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201);
    res.send("user regstered successfully");
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.headers.authorization.split(" ")[1];
  try {
    var decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    user.token = generateToken(user._id, "1h");

    if (user.refreshToken === refreshToken) {
      res.json({
        token: user.token,
      });
    } else {
      res.status(401);
      throw new Error("invalid auth token");
    }
  } catch (err) {
    // err
    if (err.message === "jwt expired") {
      const user = User.findOne({ refreshToken: refreshToken }).exec();
      user.token = undefined;
      user.refreshToken = undefined;
      user.save();
      res.send("loggedout");
    }
    res.json(err);
  }
});
const userLogout = asyncHandler(async (req, res) => {
  const refreshToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");
  if (user) {
    user.token = undefined;
    user.refreshToken = undefined;
    user.save();
    res.send("logout successful");
  } else {
    res.status(401);
    throw new Error("logout failed");
  }
});
const getUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
export {
  authUser,
  getUserProfile,
  registerUser,
  refreshToken,
  userLogout,
  getUser,
};
