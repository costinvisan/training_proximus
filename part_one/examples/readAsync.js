const fs = require('fs');
const fsPromise = require('fs/promises');
 
const main = async () => {
 
    console.log('Voi citi continul fisierului sincron');
 
    const continutSincron = fs.readFileSync('./text.in');
 
    console.log(`Continutul sincron este: ${continutSincron}\n----------------\n`);
 
    console.log('Voi citi continul fisierului cu promisiune');
 
    let continutPromisiune = "NaN";
 
    fsPromise.readFile('text.in').then(continutPromisiune => console.log(`Continutul promisiune este: ${continutPromisiune}\n----------------\n`));
 
    console.log(`Continutul promisiune in afara promisiunii este: ${continutPromisiune}\n----------------\n`);
 
    console.log('Voi citi continul fisierului cu async await');
 
    let continutAsyncAwait = "NaN";
 
    continutAsyncAwait = await fsPromise.readFile('text.in');
 
    console.log(`Continutul async await este: ${continutAsyncAwait}\n----------------\n`);
}
 
 
main();