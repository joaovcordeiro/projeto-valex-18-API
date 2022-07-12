import { Router } from "express";
import * as cardController from "../controllers/cardController.js";


const cardRouter = Router();

cardRouter.post('/card/create', cardController.createCard);
cardRouter.put('/card/activate', cardController.activateCard);
cardRouter.get('/card/visualize', cardController.visualizateCards);
cardRouter.get('/card/balance', cardController.visualizateCardsBalance);
cardRouter.post('/card/recharge', cardController.rechargeCards);
cardRouter.post('/card/payment', cardController.paymentCard);
cardRouter.post('/card/block', cardController.blockCard);
cardRouter.post('/card/unlock', cardController.unlockCard);

export default cardRouter;