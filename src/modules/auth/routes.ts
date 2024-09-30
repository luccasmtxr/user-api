import express from 'express';
import { validateLoginData, login, logout } from "./controller"
import { protectAuth } from "../../middleware/authMiddleware";

const router = express.Router();

router.post('/login', validateLoginData, login);

router.post('/logout', protectAuth, logout);

export default router;