const numbersArr = [];

for (let i = 0; i <= 100; i++) {
    numbersArr.push(i);
}

const calculateSum = (array) => {
    return array.reduce((sum, element) => sum + element);
}

console.log(calculateSum(numbersArr));

module.exports = {
    calculateSum
};
