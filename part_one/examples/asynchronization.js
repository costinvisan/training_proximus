function promises() {
    const getAgePromise = new Promise((resolve, reject) => {
        resolve(25);
    });
     
    getAgePromise.then((age) => console.log(`My age is ${age}`));
};

function asyncAndAwait() {
    const getAgeAsync = () => new Promise((resolve, reject) => {
        resolve(25);
    });
     
    // echivalent cu const getAgeAsync = async () => 25;
     
    const main = async () => {
        const age = await getAgeAsync();
     
        console.log(`My age is ${age}`);
    }
     
    main();
};

console.log("---example for promises---");
promises();

console.log("---example for async and await---");
asyncAndAwait();