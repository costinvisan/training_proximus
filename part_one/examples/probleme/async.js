function functieAsincrona() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("2 sec delay --> promise");
        }, 2000);
    });
}


functieAsincrona().then((res) => {
    console.log(res);
}).catch((err) => {
    console.error("Error:", err);
});



