import { Router } from 'express';

import {
getCepHandler
} from "./controller";

const router = Router();

router.get("/:cep", getCepHandler);

export default router;