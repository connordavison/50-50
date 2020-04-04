module.exports = class SinhRaise {
    raise(initial, round) {
        return initial * Math.sinh(round);
    }
    toString() {
        return `i sinh(r)`;
    }
}
