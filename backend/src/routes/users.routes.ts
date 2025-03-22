import { Router } from "express";
import { registerUsers, deleteUser, loginUser, logoutUser } from "../controllers/users.controller.js";

const router = Router();

router.post("/register", registerUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/delete", deleteUser);


export default router;