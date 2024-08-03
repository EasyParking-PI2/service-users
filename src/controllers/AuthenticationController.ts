import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/user.model";
import jwt from 'jsonwebtoken'
import { User } from "../types/User.type";


/**
 * @Route POST /api/auth/login
 * @Access Public
 * @Desc Login user
 * @Params login, password
 */
const login = expressAsyncHandler(async (req: Request, res: Response) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400);
    throw new Error('Login and password are required');
  }

  const userModel = new UserModel();
  const user = await userModel.getByLogin(login);

  if (!user || !user.id) {
    res.status(401);
    throw new Error('Invalid login or password');
  }

  if (!await userModel.comparePasswords(password, user.password??'')) {
    res.status(401);
    throw new Error('Invalid login or password');
  }


  res.status(200).json({
    user: {
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      profile: user.profile,
    },
    token: generateToken(user.id)
  });

});

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '30d'
  })
}

export {
  login
}