const express = require('express');
const RouletteController = require('./controllers/RouletteController');
const BetController = require('./controllers/BetController');

const router = express.Router();

router.post('/roulette/save', RouletteController.saveRoullete);
router.put('/roulette/:rouletteId(\\d+)/open', RouletteController.openRoullete);
router.get('/roulette/all', RouletteController.getAllRoulette);

router.post('/bet/save', BetController.saveBet);
router.get('/bet/all', BetController.getAllBet);
router.put('/bet/:rouletteId(\\d+)/disabled', BetController.disableBets);

module.exports = router;
