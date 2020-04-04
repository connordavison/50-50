module.exports = class CoshRaise {
    raise(initial, round) {
        return initial * Math.cosh(round);
    }
    toString() {
        return `i cosh(r)`;
    }
}
