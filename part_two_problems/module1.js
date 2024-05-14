const calculateSum = (arr) => {

    return arr.reduce((accumulator, value) => accumulator + value, 0);
}

module.exports = {calculateSum};