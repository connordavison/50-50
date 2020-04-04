const Gaussian = require('./math/statistics/models/gaussian/Gaussian');

module.exports = class SimulationRunner {
    constructor(
        simulator,
        meanCalculator,
        standardDeviationCalculator,
        gaussianCumulativeDistributionFunction,
        csvWriter,
    ) {
        this.simulator = simulator;
        this.meanCalculator = meanCalculator;
        this.standardDeviationCalculator = standardDeviationCalculator;
        this.gaussianCumulativeDistributionFunction = gaussianCumulativeDistributionFunction;
        this.csvWriter = csvWriter;
    }

    run(seeds, initials, raisers) {
        const sampleSize = 50000000;

        for (const seed of seeds) {
            for (const initial of initials) {
                for (const raiser of raisers) {
                    const maxesList = [];
                    const playsList = [];

                    for (let i = 0; i < sampleSize; i++) {
                        const {max, plays} = this.simulator.simulate(seed, initial, raiser);

                        maxesList.push(max);
                        playsList.push(plays);
                    }

                    const maxesAvg = this.meanCalculator.calculate(maxesList);
                    const maxesStddev = this.standardDeviationCalculator.calculate(maxesList, maxesAvg);
                    const maxesVariance = Math.pow(maxesStddev, 2);
                    const maxesGaussian = new Gaussian(maxesAvg, maxesVariance, sampleSize);

                    const playsAvg = this.meanCalculator.calculate(playsList);
                    const playsStddev = this.standardDeviationCalculator.calculate(playsList, playsAvg);
                    const playsVariance = Math.pow(playsStddev, 2);
                    const playsGaussian = new Gaussian(playsAvg, playsVariance, sampleSize);

                    let score = 0;

                    score += (1 - this.gaussianCumulativeDistributionFunction.calculate(10 * seed, maxesGaussian)) * 10;
                    score += this.gaussianCumulativeDistributionFunction.calculate(100, playsGaussian) * 10;

                    this.csvWriter.write(
                        seed,
                        initial,
                        raiser.toString(),
                        score,
                        maxesAvg,
                        maxesStddev,
                        1 - this.gaussianCumulativeDistributionFunction.calculate(1 * seed, maxesGaussian),
                        1 - this.gaussianCumulativeDistributionFunction.calculate(2 * seed, maxesGaussian),
                        1 - this.gaussianCumulativeDistributionFunction.calculate(5 * seed, maxesGaussian),
                        1 - this.gaussianCumulativeDistributionFunction.calculate(10 * seed, maxesGaussian),
                        playsAvg,
                        playsStddev,
                        1 - this.gaussianCumulativeDistributionFunction.calculate(10, playsGaussian),
                        1 - this.gaussianCumulativeDistributionFunction.calculate(20, playsGaussian),
                        1 - this.gaussianCumulativeDistributionFunction.calculate(50, playsGaussian),
                        1 - this.gaussianCumulativeDistributionFunction.calculate(100, playsGaussian),
                    );
                }
            }
        }
    }
}
