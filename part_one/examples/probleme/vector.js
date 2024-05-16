function vectorPar() {

    let vectPar = [];

    for(i=0; i<=100; i++){

        if(i % 2 === 0) {
            vectPar.push(i);
        }
    }

    return vectPar;

}

function indexNumar(vector, idx) {

    if(idx>=1 && idx <= vector.length) {
        console.log("Numarul este: " + vector[idx - 1]);
        console.log("Pozitia numarului este: " + [idx] );
    } else {
        console.log("Index invalid");
    }

}

let numPare = vectorPar();

console.log(numPare);
indexNumar(numPare, 51);