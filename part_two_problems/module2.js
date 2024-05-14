const module1 = require('./module1');

const vec = [1,2,3,4,5,6];

const calculateSumWithParNam = (vec, parNum) => {
    let newVec = vec.filter(number => number%2 == parNum%2);
    return module1.calculateSum(newVec);
}

module.exports = {calculateSumWithParNam}