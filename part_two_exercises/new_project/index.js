const express = require('express');
const moment = require('moment');

const momentDateTime = moment().format("YYYY-LL-ZZThh:mm");
console.log(momentDateTime);

const app = express();

app.get('/', (req, res) => {
    res.send(momentDateTime);
});

app.listen(3000);