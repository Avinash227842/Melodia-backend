import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

//router.use(protectRoute, requireAdmin);
//we can do this also and remove the protectRoute and requireAdmin from the routes below

router.get("/check",protectRoute,requireAdmin, checkAdmin);

//createSong is a function that creates a new song it is a protected route and only admin can access it, it uses post method
router.post("/songs", protectRoute, requireAdmin, createSong);

//deleteSong is a function that deletes a song it is a protected route and only admin can access it, it uses delete method
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);

//createAlbum is a function that creates a new album it is a protected route and only admin can access it, it uses post method
router.post("/albums", protectRoute, requireAdmin, createAlbum);

//deleteAlbum is a function that deletes a album it is a protected route and only admin can access it, it uses delete method
router.delete("/albums/:id", protectRoute, requireAdmin, deleteAlbum);

export default router