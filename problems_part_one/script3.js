let date = new Date();

function printDateInfo(date){

console.log("Current date is: " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
console.log("Current time is: " + date.getHours() + ":" + date.getMinutes() +":" + date.getSeconds());
}

printDateInfo(date);