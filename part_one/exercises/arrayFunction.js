const numbersArr = [];

for (let i = 0; i <= 100; i++) {
    numbersArr.push(i);
}

function getNumberAtIndex(array, index, printFunction) {
    const number = array[index];
    printFunction(number);
}

function printNumber(number) {
    console.log("The number is: " + number);
}

getNumberAtIndex(numbersArr, 2, printNumber);