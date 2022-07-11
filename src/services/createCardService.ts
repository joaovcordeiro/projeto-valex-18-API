import { faker } from '@faker-js/faker';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import Cryptr from 'cryptr';

export async function createCard(apiKey, cardType: cardRepository.TransactionTypes, employeeId: number) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const company = await companyRepository.findByApiKey(apiKey);
    const employee = await employeeRepository.findById(employeeId);
    const cardExistenceVerfication = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);

    const cvc = generateCVC();
    const encriptedCVC = cryptr.encrypt(cvc);
    // const decriptedCVC = cryptr.decrypt(encriptedCVC);
    console.log(cvc);

    if (!company) {
        return null;
    }

    if (!employee || employee.companyId !== company.id) {
        return null;
    }

    if (cardExistenceVerfication) {
        return null;
    }

    const card = {
        employeeId: employeeId,
        number: generateCardNumber(),
        cardholderName: generateCardholderName(employee.fullName),
        securityCode: encriptedCVC,
        expirationDate: generateExpirationDate(),
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: cardType
    }

    await cardRepository.insert(card);
    return card;
}

function generateCardNumber() {
    return faker.random.numeric(16);
}

function generateCardholderName(name: string) {
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

function generateExpirationDate() {
    const date = new Date();
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear() + 5).slice(-2);

    return (`${month}/${year}`);
}

function generateCVC() {
    return faker.random.numeric(3);
}
