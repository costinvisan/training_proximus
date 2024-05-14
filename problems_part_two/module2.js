const module1 = require('./module1');

const calculateSum = (vec, parNum) =>{
    let newVector = vec.filter(s => s%2 == parNum%2);
    return module1.sumOfNumbers(newVector);
}

module.exports = {calculateSum};