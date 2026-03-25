const express = require('express');
//Dùng env
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
const port = process.env.PORT;
const route = require("./router/client/index.route");
const routeAdmin = require("./router/admin/index.route");
const routeApi=require("./api/admin/index.route");
//flash
app.use(cookieParser('djgwdgjwudjjd'));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());
//end flash
// Middleware để xử lý dữ liệu form
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
//ghi đè method của form
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
route(app);
app.locals.prefixAdmin = 'admin';
routeAdmin(app);
routeApi(app);
const database = require("./config/database");
database.connect();
//Dùng pug
app.set('view engine', 'pug');
app.set('views', './views');
//Dùng file tĩnh

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})