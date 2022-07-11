import { Router } from "express";
import * as cardController from "../controllers/cardController.js";

const createCardRouter = Router();

createCardRouter.post('/card/create', cardController.createCard);

export default createCardRouter;