function simpleExampleFunction() {
    function myFunc(x) {console.log(x)};
     
    const myFuncArrow = (x) => console.log(x);
    
    myFunc(3);
    myFuncArrow(3);
};

function noNeedForMain() {
    const constanta = 'abc';
    let variabila = 3;
     
    function adauga (x, y, z) {
      if (x === 'abc') {
        y = y + z;
      }
      return  y;
    }
     
    const rezultat = adauga(constanta, variabila, 10);
     
    console.log(rezultat);
};

console.log("---simple example for function---");
simpleExampleFunction();

console.log("---no need for main function example---");
noNeedForMain();

//test