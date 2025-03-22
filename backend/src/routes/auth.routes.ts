import { Router } from "express";
import { fetchToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/", fetchToken);

export default router;
