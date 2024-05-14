const currentDateTime = new Date();

const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();
const seconds = currentDateTime.getSeconds();

const day = currentDateTime.getDate();
const month = currentDateTime.getMonth() + 1;
const year = currentDateTime.getFullYear();

console.log(`Current time: ${hours}:${minutes}:${seconds}` +  `\n` + `Current date: ${day}/${month}/${year}`);