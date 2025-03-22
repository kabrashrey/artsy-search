import { Router } from "express";
import { getArtworks } from "../controllers/atrworks.controller.js";

const router = Router();

router.get("/", getArtworks);

export default router;
