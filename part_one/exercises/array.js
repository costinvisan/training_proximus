const numbersArr = [];

for (let i = 0; i <= 100; i++) {
    numbersArr.push(i);
}

const evenNumbersArr = numbersArr.filter(num => num % 2 === 0);
console.log("The even numbers of the array are: " + evenNumbersArr);