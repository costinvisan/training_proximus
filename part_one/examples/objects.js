function accessElemFromObj() {
    const obj = {a:1, b:2};
 
    console.log(obj.a);
    console.log(obj['b']);
};

function passByValAndRef() {
    const obj1 = {a:2};
    const obj2 = obj1; // copiere prin referinta
    
    obj2.a = 5;
    console.log(obj1); // {a:5} -> valoarea s-a modificat si in obiectul original
    
    const obj3 = Object.assign({}, obj1); // copiere prin valoare
    
    obj3.a = 10;
    console.log(obj1); // {a:5} -> valoarea nu s-a modificat
    
    const obj4 = {...obj1} // copiere prin valoare (modern, folosind spread operator, ES6)
    
    obj4.a = 9772;
    console.log(obj1); // {a:5} -> valoarea nu s-a modificat
};

function functionalMethods() {
    const arr = [1, 2, 3, 4];
    console.log(arr.map(x => x*2));
    
    const obj = { a:2, b:3, c: (x, y) => console.log(x + y)}
    console.log(obj.c(obj.a, obj['b']));
    
    const func1 = (x, cb) => cb(x);
    const func2 = y => console.log(y);
    
    func1(3, func2);
};

console.log("---access elements form objects---");
accessElemFromObj();

console.log("---passing by value vs by reference---");
passByValAndRef();

console.log("---examples for functional methods---");
functionalMethods();