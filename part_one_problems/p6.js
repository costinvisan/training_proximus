
async function afterTwoSeconds() {

    const printSomething = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve("After 2 seconds!!"), 2000) 
    });
          
    const result = await printSomething();
    console.log(result);

};
afterTwoSeconds();