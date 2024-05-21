const m1 = require('./m1');

function mod2(vec, parNum){
    let v = vec.filter(i => i%2 == parNum%2 );
    return m1.sum(v);
}

module.exports = {mod2};