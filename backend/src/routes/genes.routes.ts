import { Router } from "express";
import { getGenes } from "../controllers/genes.controller";

const router = Router();

router.get("/", getGenes);

export default router;
