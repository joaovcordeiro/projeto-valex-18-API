import { Router } from "express";
import createCardRouter from "./cardRouter.js";

const router = Router();
router.use(createCardRouter);

export default router;