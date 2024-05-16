const sum = require('./sum');

function sumfilter(vec, parNum) {
    const vectorFiltrat = vec.filter(numar => numar % 2 === parNum % 2);
    return sum(vectorFiltrat);
}

module.exports = sumfilter;