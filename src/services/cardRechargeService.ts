import Cryptr from 'cryptr';
import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as cardUtils from '../utils/cardUtils.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as errorHandler from '../middlewares/errorHandler.js';

export async function rechargeCards(apiKey, cardId: number, amount: number) {
    const company = await companyRepository.findByApiKey(apiKey);
    const card = await cardRepository.findById(cardId);

    if (!company) {
        throw errorHandler.unauthorizedError();
    }
    if (amount <= 0) {
        throw errorHandler.badRequestError();
    }
    if (!card) {
        throw errorHandler.notFoundError();
    }
    if (card.isBlocked) {
        throw errorHandler.badRequestError();
    }

    if (cardUtils.cardExpired(card.expirationDate)) {
        throw errorHandler.badRequestError();
    }

    const recharge = {
        cardId,
        amount
    }

    await rechargeRepository.insert(recharge);

    return recharge;
}





