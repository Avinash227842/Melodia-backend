import { Router } from "express";
import { get } from "mongoose";
import { getAllAlbumById, getAllAlbums } from "../controller/albumController.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAllAlbumById);

export default router