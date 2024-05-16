const module2 = require('./module2');

const displayResult = () => {
    const vector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const parNumber = 2;
    console.log(module2.calculateFilteredSum(vector, parNumber));
}

displayResult();