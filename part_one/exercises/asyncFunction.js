//using promise
function asyncFunctionPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise is resolved");
        }, 2000);
    });
}

asyncFunctionPromise().then(result => {
    console.log("Resolve message: ", result);
});

//using async and await
async function asyncFunctionAwait() {
    const result = await asyncFunctionPromise();
    console.log("Await message: ", result);
}

asyncFunctionAwait();