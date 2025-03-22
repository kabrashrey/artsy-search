import { Router } from "express";
import { getArtistDetails } from "../controllers/search.controller.js";

const router = Router();

router.get("/", getArtistDetails);

export default router;
