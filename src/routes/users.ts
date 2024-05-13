import { Router } from "express";
import { allUsers } from "../controllers";

export const user : Router = Router()

user.get('/allusers', allUsers)