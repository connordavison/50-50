module.exports = class PowerRaise {
    constructor(exponent) {
        this.exponent = exponent;
    }

    raise(initial, round) {
        return initial * Math.pow(round, this.exponent);
    }

    toString() {
        return `ir^${this.exponent}`;
    }
}
