import * as cardUtils from '../utils/cardUtils.js';

export async function cardBalance(cardId: number) {
    const { balance, recharges, payments } = await cardUtils.getCardBalance(cardId);

    const cardBalance = {
        balance,
        transactions: formatTransaction(payments),
        recharges: formatTransaction(recharges)
    }

    return cardBalance;
}

function formatTransaction(transactions) {
    const formatedTransaction = transactions.map(transaction => {
        return {
            ...transaction,
            timestamp: cardUtils.formatDate(transaction.timestamp)
        }
    })
    return formatedTransaction;
}