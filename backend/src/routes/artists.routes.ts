import { Router } from "express";
import { getArtists } from "../controllers/artists.controller";

const router = Router();

router.get("/", getArtists);

export default router;
