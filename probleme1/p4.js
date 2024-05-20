const v = [];
for (let i=0;i<=100;i++){
    v[i] = i;
}

const w = v.filter( x => x%2 == 0);

console.log(w);
