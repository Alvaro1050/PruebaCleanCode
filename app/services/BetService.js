const BetService = module.exports;
const BetRepository = require('../repositories/BetRepository');
const RouletteService = require('../services/RouletteService');
const RouletteRepository = require('../repositories/RouletteRepository');
const { BadRequestError } = require('../utils/ErrorHandlerMiddleware');
const Promise = require('bluebird');

BetService.saveBet = async (bet) => {
    const { body: { quantity, numberOrColor }, userId, rouletteId } = bet;
    if (numberOrColor === 'negro' || numberOrColor === 'rojo') {
        if (quantity > 10000) throw new BadRequestError('The bet money does not meet the conditions of maximum 10,000.');
        await BetRepository.saveBet({ quantity, numberOrColor, userId, rouletteId, state: 'active' });

        return { message: 'OK' };
    } else {
        if (numberOrColor < 0 || numberOrColor > 36) throw new BadRequestError('The number you want to bet on does not exist.');
        if (quantity >= 10000) throw new BadRequestError('The bet money does not meet the conditions of maximum 10,000.');
        await BetRepository.saveBet({ quantity, numberOrColor, userId, rouletteId, state: 'active' });

        return { message: 'OK' };
    }
}

BetService.getAllBet = async () => {
    const bets = await BetRepository.getAllBet();
    let key = 0;
    const betsList = await Promise.mapSeries(bets, (bet) => {
        const parseBet = JSON.parse(bet);

        return { id: key++, ...parseBet };
    });

    return betsList;
}

BetService.disableBets = async (rouletteId) => {
    RouletteService.getRoulette(rouletteId);
    const bets = await this.getAllBet();
    const betsByRouletteId = [];
    bets.forEach(element => {
        const { rouletteId: idRoulette, id, state } = element;
        if (rouletteId === idRoulette && state === 'active') {
            Object.assign(element, { ...element, state: 'disabled' });
            BetRepository.updateBet(id, element);
            RouletteRepository.updateRoullete(rouletteId, { state: 'disabled' });
            betsByRouletteId.push(element);
        }
    });

    return betsByRouletteId;
}
