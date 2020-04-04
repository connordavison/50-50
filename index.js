const Game = require('./src/Game');
const Simulator = require('./src/Simulator');
const LinearRaise = require('./src/raises/LinearRaise');
const SimulationRunner = require('./src/SimulationRunner');
const ArithmeticMeanCalculator = require('./src/math/statistics/ArithmeticMeanCalculator');
const StandardDeviationCalculator = require('./src/math/statistics/StandardDeviationCalculator');
const CumulativeDistributionFunction = require('./src/math/statistics/models/gaussian/CumulativeDistributionFunction');
const CsvWriter = require('./src/CsvWriter');
const ErrorFunction = require('./src/math/function/ErrorFunction');

const game = new Game();

const raisers = [new LinearRaise(2, 3)];

for (let factor = 0; factor < 5; factor += 0.5) {
    for (let constant = 0; constant < 10; constant += 0.5) {
        raisers.push(new LinearRaise(factor, constant));
    }
}

for (let exponent = 0; exponent < 5; exponent += 0.1) {
    raisers.push(new PowerRaise(exponent));
}

for (let base = 2; base < 5; base += 0.25) {
    raisers.push(new ExponentialRaise(base));
}

const seeds = [1];
const initials = [1];

const simulationRunner = new SimulationRunner(
    new Simulator(new Game()),
    new ArithmeticMeanCalculator(),
    new StandardDeviationCalculator(),
    new CumulativeDistributionFunction(new ErrorFunction()),
    new CsvWriter(),
);

simulationRunner.run(seeds, initials, raisers);

function prettyFormat(gp) {
    const orders = ['K', 'M', 'B', 'T'];

    for (let i = 0; i < orders.length; i++) {
        const factor = Math.pow(1000, i);

        if (gp / factor < 10) {
            return gp + (orders[i - 1] || '');
        }

        gp = Math.floor(gp / factor);
    }

    throw 'Number too high';
}
