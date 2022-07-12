import { faker } from 'faker';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';

export interface Payment {
    cardId: number;
    cardPassword: string;
    businessesId: number;
    amount: number;
}

export type BlockCard = Omit<Payment, 'businessesId' | 'amount'>;

export function generateCardNumber() {
    return faker.random.numeric(16);
}

export function generateCardholderName(name: string) {
    const holderName = name.trim().split(' ').map((word, index) => {
        if (index === 0 || index === name.trim().split(' ').length - 1) {
            return word.toUpperCase();
        }
        else if (word.length >= 3) {
            return word.charAt(0).toUpperCase();
        }
        else return '';
    })
    return holderName.join(' ').replace('  ', ' ');
}

export function generateExpirationDate() {
    const date = new Date();
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear() + 5).slice(-2);

    return (`${month}/${year}`);
}

export function generateCVC() {
    return faker.random.numeric(3);
}

export function cardExpired(expiration: string) {
    const day = '01';
    const formatedExpiration = `${day}/${expiration.substring(0, 2)}/20${expiration.substring(3, 5)}`;
    const expirationDate = new Date(formatedExpiration);
    const today = new Date();

    if (today.getMonth() > expirationDate.getMonth() && today.getFullYear() > expirationDate.getFullYear()) {
        return true;
    }

    return false;
}

export function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
}

export async function getCardBalance(cardId: number) {
    const recharges = await rechargeRepository.findByCardId(cardId);
    const payments = await paymentRepository.findByCardId(cardId);

    const balance = recharges.reduce((acc, recharge) => acc + recharge.amount, 0) - payments.reduce((acc, payment) => acc + payment.amount, 0);

    return { balance, recharges, payments };
}
