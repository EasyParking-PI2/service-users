import expressAsyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { Profile, User } from "../types/User.type";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { validateCPF, validateEmail, validatePhone } from "../validations/user.validation";
import CustomRequest from "../types/CustomRequest.type";

/**
 * @desc Create a new user
 * @route POST /api/users
 * @access Public
 */
const createUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { login, password, name, email, cpf, phone } = req.body;

  if (!login || !password || !name || !email || !cpf || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Invalid email");
  }

  if (!validateCPF(cpf)) {
    res.status(400);
    throw new Error("Invalid CPF");
  }

  if (!validatePhone(phone)) {
    res.status(400);
    throw new Error("Invalid phone");
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

const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const cReq = req as CustomRequest;
  const { name, email, cpf, phone, password } = req.body;

  if (!cReq.user || !cReq.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (!name && !email && !cpf && !phone && !password) {
    res.status(400);
    throw new Error("At least one field is required");
  }

  if (email && !validateEmail(email)) {
    res.status(400);
    throw new Error("Invalid email");
  }

  if (cpf && !validateCPF(cpf)) {
    res.status(400);
    throw new Error("Invalid CPF");
  }

  if (phone && !validatePhone(phone)) {
    res.status(400);
    throw new Error("Invalid phone");
  }

  const userModel = new UserModel();
  const user = cReq.user;

  if (password) {
    user.password = await userModel.hashPassword(password);
  }

  user.id = cReq.user.id;
  if (name) user.name = name;
  if (email) user.email = email;
  if (cpf) user.cpf = cpf;
  if (phone) user.phone = phone;

  try{
    await userModel.update(cReq.user.id, user);
  
    res.status(200).json({
      id: cReq.user.id,
      login: cReq.user.login,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      profile: user.profile
    });
  }catch(err){
    res.status(500);
    throw new Error("Error updating user");
  }

});


export {
  createUser,
  updateUser
};