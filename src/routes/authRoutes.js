import { Router } from "express";
import { User } from "../models/userModel.js";
import { authCallback } from "../controller/authController.js";

//Router() is a function that returns a router object
const router = Router();

//callback ek endpoint hai jo auth service se aayega
//once a user logs in with clerk we call this route
router.post("/callback", authCallback)

export default router