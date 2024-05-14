let vector = [];
let size = 101;

for(let i=0;i<101;i++){
    vector.push(i);
}
function getNumber(vector,index,printNumber) {
    printNumber(vector,index);
} 
function printNumber(vector,index){
    console.log("Number from position:" + index +" is:" + vector[index]);
}

getNumber(vector,2,printNumber);
// const printEvenNumbers = vector => console.log(vector.filter(x => x%2==0));
// printEvenNumbers(vector);