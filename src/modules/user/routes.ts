import { Router } from 'express';
import { protectAuth } from '../../middleware/authMiddleware';
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler,
} from "./controller";

const router = Router();

//rota publica
router.post("/", createUserHandler);

//rotas protegidas
router.get("/", protectAuth, getUsersHandler);
router.get("/:id", protectAuth, getUserByIdHandler);
router.put("/:id", protectAuth, updateUserHandler);
router.delete("/:id", protectAuth, deleteUserHandler);

export default router;