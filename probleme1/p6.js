function promises2() {

    return new Promise((resolve) =>{

        setTimeout(function() {
            resolve("2 secunde (promise)");
        }, 2000);

    });
}

promises2().then((message)=>{
    console.log(message);
})

function asyncAndAwait2() {

    const getAsync = () => new Promise((resolve) =>{

        setTimeout(function() {
            resolve();
        }, 2000);

    })

    const main = async () => {
        const message = await getAsync();
     
        console.log("2 secunde (asyncawait)");
    }

    main();

}

asyncAndAwait2();