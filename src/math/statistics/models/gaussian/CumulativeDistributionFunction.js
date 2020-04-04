module.exports = class CumulativeDistributionFunction {
    constructor(errorFunction) {
        this.errorFunction = errorFunction;
    }

    calculate(x, gaussian) {
        return 0.5 * (
            1
            + this.errorFunction.calculate(
                (x - gaussian.getMean())
                    / Math.sqrt(2 * gaussian.getVariance())
            )
        );
    }
}
