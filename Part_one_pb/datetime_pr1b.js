const date = new Date().toISOString();
const currentData = new Date();
const currData = new Date();

const year = currData.getFullYear();
const month = ('0' + ( currData.getMonth() + 1 )).slice(-2);
const day = ('0' + currData.getDate()).slice(-2);
const hours = ('0' + currData.getHours()).slice(-2);
const minutes = ('0' + currData.getMinutes()).slice(-2);
const seconds = ('0' + currData.getSeconds()).slice(-2);

const formattedDateTime = '${year}-${month}-${day} ${hours}:${minutes}:${seconds}';

console.log("Afisare cu to ISOString", date);
console.log("Afisare cu to Date format inv", currentData);
console.log("Afisare fara fct (YYY-MM-DD HH:MM:SS): " + formattedDateTime );