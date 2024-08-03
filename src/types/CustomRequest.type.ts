import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./User.type";

interface CustomRequest extends Request{
  user:User
}

export default CustomRequest;