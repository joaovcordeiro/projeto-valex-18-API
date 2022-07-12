import { Request, Response } from 'express';
import * as cardRepository from '../repositories/cardRepository.js';
import * as cardService from '../services/createCardService.js';
import * as activateCardService from '../services/activateCardService.js';
import * as employeeCardsService from '../services/employeeCardsService.js';
import * as cardRechargeService from '../services/cardRechargeService.js';
import * as cardPaymentService from '../services/cardPaymentService.js';
import * as cardBlockService from '../services/cardBlockService.js';
import * as cardBalanceService from '../services/cardBalanceService.js';
import * as cardUtils from '../utils/cardUtils.js';

export async function createCard(req: Request, res: Response) {
    try {
        const apiKey = req.headers['x-api-key'];
        const { cardType, employeeId }: { cardType: cardRepository.TransactionTypes, employeeId: number } = req.body;

        if (!apiKey) {
            return res.status(401).send('No API key provided');
        }

        if (!cardType || !employeeId) {
            return res.status(400).send('Missing required fields');
        }

        const card = await cardService.createCard(apiKey, cardType, employeeId);

        res.status(201).send(card);

    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

export async function activateCard(req: Request, res: Response) {
    try {
        const { id: cardId, securityCode, password }: { id: number, securityCode: string, password: string } = req.body;

        if (!cardId || !securityCode || !password) {
            return res.status(400).send('Missing required fields');
        }

        const updatedCard = await activateCardService.activateCard(cardId, securityCode, password);

        res.status(200).send(updatedCard);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

export async function visualizateCards(req: Request, res: Response) {
    try {
        const { employeeId, cardPassword }: { employeeId: number, cardPassword: string } = req.body;

        if (!employeeId || !cardPassword) {
            return res.status(400).send('Missing required fields');
        }
        if (cardPassword.length < 4) {
            return res.status(400).send('Password must be at least 4 characters long');
        }

        const employeeCards = await employeeCardsService.getEmployeeCards(employeeId, cardPassword);

        res.status(200).send(employeeCards);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

export async function visualizateCardsBalance(req: Request, res: Response) {
    try {
        const { cardId } = req.body;

        if (!cardId) {
            return res.status(400).send('Missing required fields');
        }

        const balance = await cardBalanceService.cardBalance(cardId);

        res.status(200).send(balance);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

export async function rechargeCards(req: Request, res: Response) {
    try {
        const apiKey = req.headers["x-api-key"];
        const { cardId, rechargeAmount }: { cardId: number, rechargeAmount: number } = req.body;

        if (!apiKey) {
            return res.status(401).send('No API key provided');
        }
        if (!cardId || !rechargeAmount) {
            return res.status(400).send('Missing required fields');
        }

        const recharge = await cardRechargeService.rechargeCards(apiKey, cardId, rechargeAmount);

        res.status(200).send(recharge);

    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

export async function paymentCard(req: Request, res: Response) {
    try {
        const { cardId, cardPassword, businessesId, amount }: cardUtils.Payment = req.body;

        if (!cardId || !cardPassword || !businessesId || !amount) {
            return res.status(400).send('Missing required fields');
        }

        const payment = await cardPaymentService.paymentCard({ cardId, cardPassword, businessesId, amount });

        res.status(200).send(payment);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

export async function blockCard(req: Request, res: Response) {
    try {
        const { cardId, cardPassword }: cardUtils.BlockCard = req.body;

        if (!cardId || !cardPassword) {
            return res.status(400).send('Missing required fields');
        }

        const card = await cardBlockService.blockCard({ cardId, cardPassword });

        res.status(200).send(card);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

export async function unlockCard(req: Request, res: Response) {
    try {
        const { cardId, cardPassword }: cardUtils.BlockCard = req.body;

        if (!cardId || !cardPassword) {
            return res.status(400).send('Missing required fields');
        }

        const card = await cardBlockService.unlockCard({ cardId, cardPassword });

        res.status(200).send(card);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
}