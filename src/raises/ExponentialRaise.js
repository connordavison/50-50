module.exports = class ExponentialRaise {
    constructor(base) {
        this.base = base;
    }

    raise(initial, round) {
        return initial * Math.pow(initial, round - 1);
    }

    toString() {
        return `i ${this.base}^(r - 1)`;
    }
}
