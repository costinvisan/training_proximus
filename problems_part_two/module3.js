const module2 = require('./module2');

let vector = [];
let size = 10;

for(let i=0;i<size;i++){
    vector.push(i);
}

const sum =(vector,number) => console.log(module2.calculateSum(vector,number));
sum(vector,2);