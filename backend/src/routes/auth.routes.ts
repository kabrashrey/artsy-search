import { Router } from "express";
import { fetchToken } from "../controllers/auth.controller";

const router = Router();

router.post("/", fetchToken);

export default router;
