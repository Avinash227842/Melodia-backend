import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
import { getAllUsers, getMessages } from "../controller/userController.js";

const router = Router();

//allow only admin to access this route and get all the users
router.get("/", protectRoute, getAllUsers)

//router to get messages
router.get("/messages/:userId", protectRoute, getMessages)
export default router            