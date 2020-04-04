module.exports = class ArithmeticMeanCalculator {
    calculate(vals) {
        if (0 === vals.length) {
            return 0;
        }

        let sum = 0;

        for (const val of vals) {
            sum += val;
        }

        return sum / vals.length;
    }
}
