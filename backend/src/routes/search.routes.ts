import { Router } from "express";
import { getArtistDetails } from "../controllers/search.controller";

const router = Router();

router.get("/", getArtistDetails);

export default router;
