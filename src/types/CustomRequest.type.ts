import { Request } from "express";
import { User } from "./User.type";

interface CustomRequest extends Request{
  user:User
}

export default CustomRequest;