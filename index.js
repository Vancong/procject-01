const express = require('express')
const routeClient=require("./routes/client/index.route.js")
require('dotenv').config();

const database=require('./config/database.js');
database.connect();

const app = express();
const port =3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

routeClient.index(app);

app.listen(port, () => {
  console.log(`hello ${port}`)
})