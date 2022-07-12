import Cryptr from 'cryptr';
import * as cardRepository from '../repositories/cardRepository.js';
import * as cardUtils from '../utils/cardUtils.js';
import * as businessRepository from '../repositories/businessRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as errorHandler from '../middlewares/errorHandler.js';

export async function paymentCard({ cardId, cardPassword, businessesId, amount }: cardUtils.Payment) {

    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const card = await cardRepository.findById(cardId);
    const decryptedCardPassword = cryptr.decrypt(card.password);
    const business = await businessRepository.findById(businessesId);
    const { balance: cardBalance } = await cardUtils.getCardBalance(cardId);

    if (!card) {
        throw errorHandler.notFoundError();
    }

    if (amount <= 0) {
        throw errorHandler.badRequestError();
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
    if (!business) {
        throw errorHandler.notFoundError();
    }
    if (business.type !== card.type) {
        throw errorHandler.badRequestError();
    }

    if (amount > cardBalance) {
        throw errorHandler.badRequestError();
    }

    const payment = {
        cardId,
        businessId: businessesId,
        amount
    }

    await paymentRepository.insert(payment);

    return payment;

}





