function sum(vector) {
    return vector.reduce((total, num) => total + num, 0);
}

module.exports = sum;