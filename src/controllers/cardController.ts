import { Request, Response } from 'express';
import * as cardRepository from '../repositories/cardRepository.js';
import * as cardService from '../services/createCardService.js';
import * as activateCardService from '../services/activateCardService.js';


export async function createCard(req: Request, res: Response) {
    try {
        const { "x-api-key": apiKey } = req.headers;
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
    catch {
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
    catch {
        res.status(500).send('Internal server error');
    }
}