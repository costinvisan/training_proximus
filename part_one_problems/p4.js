const arr = [];

for(let i = 0; i <= 100; i++) arr.push(i);

console.log(arr.filter(x => x%2 == 0));

// p5

const printFunction = (index) => console.log(index);

function func(arr, index, printFunction) {
    printFunction(arr[index]);
}

func(arr, 3, printFunction);
