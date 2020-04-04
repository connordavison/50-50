module.exports = class LinearRaise {
    constructor(factor, constant) {
        this.factor = factor;
        this.constant = constant;
    }

    raise(initial, round) {
        if (1 === this.factor) {
            return round * this.constant;
        }

        return Math.pow(this.factor, round) * initial
            + this.constant
                * (Math.pow(this.factor, round) - 1)
                / (this.factor - 1);
    }

    toString() {
        let str = this.factor + 'x';

        if (this.constant !== 0) {
            str += ' + ' + this.constant
        }

        return str;
    }
}
