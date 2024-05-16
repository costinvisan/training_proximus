const express = require('express');

const app = express();

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

app.get('/', (req, res) => {
    res.send(`Data și ora curente: ${getCurrentDateTime()}`);
});

app.listen(3000, () => {
    console.log('Serverul rulează pe portul 3000');
});
