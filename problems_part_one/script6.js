const getPromise = (timeout) => new Promise((resolve, reject) => {
    setTimeout(
        () => {resolve(15);},
        timeout
    );
});


const getResult = async(time) =>{
    const result = await getPromise(time);
    console.log("The result expected is:" + result);
}
getResult(2000);

