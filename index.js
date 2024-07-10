const express = require('express')  // nhung thu vien
const bodyParser=require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config();    // bao mat
const port =process.env.PORT;

//method
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//falsh
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser('HHKALKS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash


// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



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