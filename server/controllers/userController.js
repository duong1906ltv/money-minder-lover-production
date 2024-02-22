// Import any necessary dependencies
// For example, assuming you have a User model
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

// Controller methods

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  res.status(StatusCodes.OK).json({ user: user });
};
