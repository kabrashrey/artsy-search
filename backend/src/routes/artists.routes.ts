import { Router } from "express";
import { getArtists, similarArtists } from "../controllers/artists.controller.js";

const router = Router();

router.get("/", getArtists);
router.get("/similar/", similarArtists);

export default router;
