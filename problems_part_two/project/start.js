const moment = require('moment');
const express = require('express');
 
const app = express();

const currentDate = moment().format("YYYY-MM-DDThh:mm");
console.log("The date is:" + currentDate);

app.get('/', (req, res) => {
    res.send(currentDate);
});
 
app.listen(3000);

