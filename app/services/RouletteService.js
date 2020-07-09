const RouletteService = module.exports;
const RouletteRepository = require('../repositories/RouletteRepository');
const { BadRequestError, NotFoundError } = require('../utils/ErrorHandlerMiddleware');
const Promise = require('bluebird');

RouletteService.saveRoulette = async () => {

    return { rouletteId: (await RouletteRepository.saveRoulette({ state: 'disabled' })) - 1 };
}

RouletteService.openRoulette = async (key) => {
    const roulette = await this.getRoulette(key);
    const { state } = JSON.parse(roulette);
    if (state === 'active') throw new BadRequestError('Roulette is already active.');
    RouletteRepository.updateRoullete(key, { state: 'active' });

    return { message: 'Roulette has been successfully activated'};
}

RouletteService.getRoulette = async (key) => {
    const roulette = await RouletteRepository.getRoulette(key);
    if (roulette === null) throw new NotFoundError('The roulette id you are indicating does not exist.');

    return roulette;
}

RouletteService.getAllRoulette = async () => {
    const roulettes = await RouletteRepository.getAllRoulette();
    let key = 0;
    const roullets = await Promise.mapSeries(roulettes, (roulette) => {
        const parseRoulette = JSON.parse(roulette);

        return { id: key++, ...parseRoulette };
    });

    return roullets;
}