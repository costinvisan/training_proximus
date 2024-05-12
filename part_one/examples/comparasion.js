function compNumbString() {
    const a = 10;
    const b = '10';
    
    console.log(a == b);
    console.log(a === b);
};

function compStrings() {
    const c = 'abc';
    const d = 'abc';
    
    console.log(c == d);
    console.log(c === d);
};

function compDiffTypes() {
    const fals = false;
    const str = '';
    const zero = 0;
    
    console.log(fals == str);
    console.log(fals == zero);
    console.log(str == zero);
    
    console.log(fals === str);
    console.log(fals === zero);
    console.log(str === zero);
};

console.log("---comparasion between number and string---");
compNumbString();

console.log("---comparasion between strings---");
compStrings();

console.log("---comparasion between different types---");
compDiffTypes();
