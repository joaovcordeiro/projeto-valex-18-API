import * as cardRepository from '../repositories/cardRepository.js';
import Cryptr from 'cryptr';
import * as cardUtils from '../utils/cardUtils.js';
import * as errorHandler from '../middlewares/errorHandler.js';
export async function activateCard(cardId: number, securityCode: string, password: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const card = await cardRepository.findById(cardId);

    const decriptedCVC = cryptr.decrypt(card.securityCode);
    const encriptedPassword = cryptr.encrypt(password);

    if (!card) {
        throw errorHandler.notFoundError();
    }

    if (cardUtils.cardExpired(card.expirationDate)) {
        throw errorHandler.badRequestError();
    }

    if (card.password) {
        throw errorHandler.unauthorizedError();
    }

    if (decriptedCVC !== securityCode) {
        throw errorHandler.unauthorizedError();
    }

    if (password.length !== 4) {
        throw errorHandler.badRequestError();
    }

    const updatedCard = {
        ...card,
        password: encriptedPassword,
        isBlocked: false
    }

    await cardRepository.update(cardId, updatedCard);

    return updatedCard;
}




