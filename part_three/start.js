const express = require('express');
const bookRoutes = require('./router/router');

const app = express();

app.use('/', bookRoutes);

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});