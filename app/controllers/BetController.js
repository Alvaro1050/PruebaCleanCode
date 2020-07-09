const BetController = module.exports;
const BetService = require('../services/BetService');

BetController.saveBet = (req, res, next) => {
    const { query: { userId, rouletteId }, body } = req;
    BetService.saveBet({body, userId, rouletteId}).then(response => res.send(response)).catch(error => next(error));
}

BetController.disableBets = (req, res, next) => {
    const { params: { rouletteId } } = req;
    BetService.disableBets(rouletteId).then(response => res.send(response)).catch(error => next(error));
}

BetController.getAllBet = (req, res, next) =>
    BetService.getAllBet().then(response => res.send(response)).catch(error => next(error));
