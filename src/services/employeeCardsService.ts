import Cryptr from 'cryptr';
import * as cardRepository from '../repositories/cardRepository.js';

export async function getEmployeeCards(employeeId: number, cardPassword: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const cards = await cardRepository.findByCardEmployeeId(employeeId);
    const employeeCards = cards.map(card => {
        if (card.password !== null && cryptr.decrypt(card.password) === cardPassword) {
            return card;
        }
    });

    return employeeCards;

}





