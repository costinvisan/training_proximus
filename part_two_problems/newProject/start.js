const express = require('express');
const moment = require('moment');

const app = express();

const currentDateTime = moment();
console.log(currentDateTime.format("YYYY-MM-DDThh:mm"));

app.get('/', (req, res) => {
    res.send(currentDateTime.format("YYYY-MM-DDThh:mm"));
});

app.listen(3000);
