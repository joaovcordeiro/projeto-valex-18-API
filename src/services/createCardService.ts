import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as cardUtils from '../utils/cardUtils.js';
import Cryptr from 'cryptr';
import * as errorHandler from '../middlewares/errorHandler.js';

export async function createCard(apiKey, cardType: cardRepository.TransactionTypes, employeeId: number) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    const company = await companyRepository.findByApiKey(apiKey);
    const employee = await employeeRepository.findById(employeeId);
    const cardExistenceVerfication = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);

    const cvc = cardUtils.generateCVC();
    const encriptedCVC = cryptr.encrypt(cvc);
    // const decriptedCVC = cryptr.decrypt(encriptedCVC);

    if (!company) {
        throw errorHandler.unauthorizedError();
    }

    if (!employee || employee.companyId !== company.id) {
        throw errorHandler.unauthorizedError();
    }

    if (cardExistenceVerfication) {
        throw errorHandler.badRequestError();
    }

    const card = {
        employeeId: employeeId,
        number: cardUtils.generateCardNumber(),
        cardholderName: cardUtils.generateCardholderName(employee.fullName),
        securityCode: encriptedCVC,
        expirationDate: cardUtils.generateExpirationDate(),
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: cardType
    }

    await cardRepository.insert(card);
    return { card, cvc };
}


