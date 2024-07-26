import expressAsyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { User } from "../types/User.type";
import UserModel from "../models/user.model";

/**
 * @desc Create a new user
 * @route POST /api/users
 * @access Public
 */
const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const user: User = req.body;
  const userModel = new UserModel();
  await userModel.create(user);
  res.json(user);
});

export {
  createUser,
};