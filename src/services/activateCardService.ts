import * as cardRepository from '../repositories/cardRepository.js';
import Cryptr from 'cryptr';

export async function activateCard(cardId: number, securityCode: string, password: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const card = await cardRepository.findById(cardId);
    const decriptedCVC = cryptr.decrypt(card.securityCode);
    const encriptedPassword = cryptr.encrypt(password);

    if (!card) {
        console.log('Card not found');
        return null;
    }

    if (cardExpired(card.expirationDate)) {
        console.log('Card expired');
        return null;
    }

    if (card.password) {
        console.log('Card already activated');
        return null;
    }

    if (decriptedCVC !== securityCode) {
        console.log('Invalid security code');
        return null;
    }

    if (password.length !== 4) {
        console.log('Invalid password');
        return null;
    }

    const updatedCard = {
        ...card,
        password: encriptedPassword,
        isBlocked: false
    }

    await cardRepository.update(cardId, updatedCard);

    return updatedCard;
}

function cardExpired(expiration: string) {
    const day = '01';
    const formatedExpiration = `${day}/${expiration.substring(0, 2)}/20${expiration.substring(3, 5)}`;
    const expirationDate = new Date(formatedExpiration);
    const today = new Date();

    if (today.getMonth() > expirationDate.getMonth() && today.getFullYear() > expirationDate.getFullYear()) {
        return true;
    }

    return false;
}

