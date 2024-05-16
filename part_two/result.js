const sumfilter = require('./sumfilter');

function result(vector, numar) {
    const sum = sumfilter(vector, numar);
    console.log("suma elementelor cu aceeasi paritate este:", sum, ",numar de paritate =", numar);
}

module.exports = result;