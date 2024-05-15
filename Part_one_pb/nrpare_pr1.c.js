//Creati un script care populeaza un vector cu numere de la 0 la 100 si afiseaza doar numerele pare

let nrPare = [];

for(let i = 0; i<= 100; i++) {
    if(i % 2 == 0) {
        nrPare.push(i)
    }
}

console.log("Numerele pare 0-100 : ", nrPare);
