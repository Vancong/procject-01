const express = require('express')  // nhung thu vien
const bodyParser=require('body-parser');
const app = express();
const port =3000;

// parse application/json
app.use(bodyParser.json());

require('dotenv').config();    // bao mat

const database=require('./config/database.js');
database.connect();    // data


const routeClient=require("./routes/client/index.route.js");  // nhung file route
const routeAdmin=require("./routes/admin/index.route.js");



app.set('views', './views');   // dinh nghia thu muc view
app.set('view engine', 'pug');   // dinh nghia pug
 
app.use(express.static('public'));   // thu muc tinh


//app locals varliables
const configSyem=require('./config/sytem.js');
app.locals.prefixAdmin=configSyem.path.prefixAdmin;   // link path la object path la phan tu
// bien prefixAdmin dung duoc cho tat ca file pug



routeClient.index(app);  // goi ham 
routeAdmin.index(app);

app.listen(port, () => {
  console.log(`hello ${port}`)
})