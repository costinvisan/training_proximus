const module1 = require('./module1');

const calculateFilteredSum = (vec, parNum) => {
    const filteredVec = vec.filter(num => num % 2 == parNum % 2);
    return module1.calculateSum(filteredVec);
}

module.exports = {
    calculateFilteredSum
};