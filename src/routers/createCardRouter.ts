import { Router } from "express";
import createCard from "../controllers/createCardController.js";

const createCardRouter = Router();

createCardRouter.post('/create', createCard);

export default createCardRouter;