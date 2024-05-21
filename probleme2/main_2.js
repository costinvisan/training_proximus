const x = require('moment');
const express = require('express');

console.log(x().format("YYYY-MM-DDThh:mm"));

const app = express();

app.get('/', (req, res) => {
    res.send(x().format("YYYY-MM-DDThh:mm"));
});
 
app.listen(3000);