let vector = [];
let size = 101;

for(let i=0;i<101;i++){
    vector.push(i);
}

const printEvenNumbers = vector => console.log(vector.filter(x => x%2 == 0));
printEvenNumbers(vector);