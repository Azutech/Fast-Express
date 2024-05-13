import { Router } from "express";
import { allUsers } from "../controllers/users";

export const user : Router = Router()

user.get('/allusers', allUsers)