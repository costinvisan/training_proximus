const express = require('express');
const routes = require("./router/router.js")
const app = express();


app.use(express.json());
app.use('/',routes);
 
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});