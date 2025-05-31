import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs, searchSongs } from "../controller/songController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

//allow only admin to access this route and get all the songs
router.get("/search",searchSongs)
router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router