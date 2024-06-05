const express = require('express')
const routeClient=require("./routes/client/index.route.js")
require('dotenv').config();

const app = express();
const port = process.env.PROT;

app.set('views', './views');
app.set('view engine', 'pug');


routeClient.index(app);

app.listen(port, () => {
  console.log(`hello ${port}`)
})