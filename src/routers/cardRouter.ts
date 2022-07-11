import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import * as activateCardController from "../controllers/cardController.js";

const createCardRouter = Router();

createCardRouter.post('/card/create', cardController.createCard);
createCardRouter.put('/card/activate', activateCardController.activateCard);

export default createCardRouter;