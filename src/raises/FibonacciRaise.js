module.exports = class FibonacciRaise {
    constructor () {
        this.PHI = (1 + Math.sqrt(5)) / 2;
        this.PSI = (1 - Math.sqrt(5)) / 2
    }
    raise(initial, round) {
        const fn = Math.round(
            (Math.pow(this.PHI, round) - Math.pow(this.PSI, round))
                / Math.sqrt(5)
        );

        return initial * fn;
    }
    toString() {
        return `iF_r`;
    }
}
