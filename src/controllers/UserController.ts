import expressAsyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { User } from "../types/User.type";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";

/**
 * @desc Create a new user
 * @route POST /api/users
 * @access Public
 */
const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { login, password, name, email, cpf, phone, profile  } = req.body;

  if (!login || !password || !name || !email || !cpf || !phone || !profile) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user: User = {
    login,
    password: hashedPassword,
    name,
    email,
    cpf,
    phone,
    profile,
  }

  const userModel = new UserModel();
  const createResponse = await userModel.create(user);
  
  res.status(201).json({
    id: createResponse.generated_keys[0],
    login,
    name,
    email,
    cpf,
    phone,
    profile
  });
});

export {
  createUser,
};