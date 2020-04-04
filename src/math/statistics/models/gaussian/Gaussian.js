module.exports = class Guassian {
    constructor(mean, variance, sampleSize) {
        this.mean = mean;
        this.variance = variance;
        this.sampleSize = sampleSize;
    }

    getMean() {
        return this.mean;
    }

    getVariance() {
        return this.variance;
    }

    getSampleSize() {
        return this.sampleSize;
    }
}
