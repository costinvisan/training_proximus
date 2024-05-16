// const moment = require('moment');
// const today = moment();

// console.log(today.format('YYYY-MM-DD HH:mm'));

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const moment = require('moment');
    const today = moment().format('YYYY-MM-DD HH:mm');

    res.send(`Date & Time --> ${today}`);
});

const port = 3000;
app.listen(port, () => console.log(`ruleaza pe portul ${port}`));