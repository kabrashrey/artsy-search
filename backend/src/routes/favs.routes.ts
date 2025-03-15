import { Router } from "express";
import { getFavs, addFav, delFav } from "../controllers/favs.controller";

const router = Router();

router.get("/", getFavs);
router.post("/add", addFav);
router.delete("/delete", delFav);

export default router;
