const v = [];
for (let i=0;i<=100;i++){
    v[i] = i;
}

const w = v.filter( x => x%2 == 0);

console.log(w);

console.log("----------------");

function pb5(n ,i, afisare) {

    if( i >= 0 && i <= n.length ){
        afisare(n[i]);
    }
    else{
        console.log("Change the index parameter");
    }

}

function afisare(n){
    console.log(n);
}

pb5(w,5,afisare);


