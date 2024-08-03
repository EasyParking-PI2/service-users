import { NextFunction, Request, Response } from "express";
import CustomRequest from "../types/CustomRequest.type";
import jwt from 'jsonwebtoken'
import UserModel from "../models/user.model";
import { User } from "../types/User.type";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if(!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) return res.status(401).send('Not authorized');

  try{
    token = req.headers.authorization.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if(!decoded) return res.status(401).send('Not authorized');

    const userModel = new UserModel();
    const user = await userModel.getById((decoded as any).userId);
    if(!user) return res.status(401).send('Not authorized');

    const userWithouPassword = {
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      profile: user.profile,
    } as User;

    (req as CustomRequest).user = userWithouPassword;
    next();
  }catch(err){
    console.error(err);
    return res.status(401).send('Not authorized');
  }

};

export default protect;