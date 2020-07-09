const RouletteController = module.exports;
const RouletteService = require('../services/RouletteService');

RouletteController.saveRoullete = (req, res, next) => RouletteService.saveRoulette()
  .then(response => res.send(response))
  .catch(error => next(error));

RouletteController.openRoullete = (req, res, next) => {
  const { params: { rouletteId } } = req;
  RouletteService.openRoulette(rouletteId).then(response => res.send(response))
  .catch(error => next(error));
};

RouletteController.getAllRoulette = (req, res, next) =>
  RouletteService.getAllRoulette().then(response => res.send(response))
  .catch(error => next(error));