import expressAsyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { Profile, User } from "../types/User.type";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { validateCPF, validateEmail, validatePhone } from "../validations/user.validation";

/**
 * @desc Create a new user
 * @route POST /api/users
 * @access Public
 */
const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { login, password, name, email, cpf, phone  } = req.body;

  if (!login || !password || !name || !validateEmail(email) || !validateCPF(cpf) || !validatePhone(phone)) {

    console.log('login', login);
    console.log('password', password);
    console.log('name', name);
    console.log('email', validateEmail(email));
    console.log('cpf', validateCPF(cpf));
    console.log('phone', validatePhone(phone));


    res.status(400);
    throw new Error("All fields are required");
  }

  const userModel = new UserModel();

  const hashedPassword = await userModel.hashPassword(password);
  const user: User = {
    login,
    password: hashedPassword,
    name,
    email,
    cpf,
    phone,
    profile: Profile.USER,
  }

  const createResponse = await userModel.create(user);
  
  res.status(201).json({
    id: createResponse.generated_keys[0],
    login,
    name,
    email,
    cpf,
    phone,
    profile: Profile.USER
  });
});

export {
  createUser,
};