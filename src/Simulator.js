module.exports = class Simulator {
    constructor(game) {
        this.game = game;
    }
    simulate(seed, initial, raiser) {
        let max = 0;
        let remaining = seed;
        let gamePlays = 1;
        let gamePlaysForMax = gamePlays;

        if (initial > seed) {
            return {max, plays: gamePlays};
        }

        while (remaining > 0) {
            let bet = initial;
            let roundPlays = 0;

            while (!this.game.win()) {
                remaining -= bet;
                gamePlays++;
                roundPlays++;

                bet = raiser.raise(initial, roundPlays);

                if (remaining - bet < 1 || gamePlays > 10000) {
                    return {max, plays: gamePlaysForMax};
                }
            }

            if (remaining > max) {
                max = remaining;
                gamePlaysForMax = gamePlays;
            }

            remaining += bet;
        }

        throw 'Should not have reached this point.';
    }
}
