module.exports = class StandardDeviationCalculator {
    calculate(vals, avg) {
        if (0 === vals.length) {
            return 0;
        }

        let squareDifferences = 0;

        for (const val of vals) {
            squareDifferences += Math.pow(Number.parseFloat(val) - avg, 2);
        }

        return Math.sqrt(squareDifferences / vals.length);
    }
}
