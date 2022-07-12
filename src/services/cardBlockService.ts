import * as cardRepository from '../repositories/cardRepository.js';
import Cryptr from 'cryptr';
import * as cardUtils from '../utils/cardUtils.js';
import * as errorHandler from '../middlewares/errorHandler.js';

export async function blockCard({ cardId, cardPassword }: cardUtils.BlockCard) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const card = await cardRepository.findById(cardId);
    const decryptedCardPassword = cryptr.decrypt(card.password);

    if (!card) {
        throw errorHandler.notFoundError();
    }
    if (card.isBlocked) {
        throw errorHandler.badRequestError();
    }
    if (cardUtils.cardExpired(card.expirationDate)) {
        throw errorHandler.badRequestError();
    }
    if (cardPassword !== decryptedCardPassword) {
        throw errorHandler.unauthorizedError();
    }

    const updatedCard = {
        ...card,
        isBlocked: true
    }

    await cardRepository.update(cardId, updatedCard);

    return updatedCard;

}

export async function unlockCard({ cardId, cardPassword }: cardUtils.BlockCard) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const card = await cardRepository.findById(cardId);
    const decryptedCardPassword = cryptr.decrypt(card.password);

    if (!card) {
        throw errorHandler.notFoundError();
    }
    if (!card.isBlocked) {
        throw errorHandler.badRequestError();
    }
    if (cardUtils.cardExpired(card.expirationDate)) {
        throw errorHandler.badRequestError();
    }
    if (cardPassword !== decryptedCardPassword) {
        throw errorHandler.unauthorizedError();
    }

    const updatedCard = {
        ...card,
        isBlocked: false
    }

    await cardRepository.update(cardId, updatedCard);

    return updatedCard;

}






