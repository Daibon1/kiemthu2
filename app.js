const express = require('express');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const route = require("./router/client/index.route");
const routeAdmin = require("./router/admin/index.route");
const routeApi = require("./api/admin/index.route");

const app = express();

// middleware
app.use(cookieParser('djgwdgjwudjjd'));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: "test-secret",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// routes
route(app);
app.locals.prefixAdmin = 'admin';
routeAdmin(app);
routeApi(app);

// view
app.set('view engine', 'pug');
app.set('views', './views');

// static
app.use(express.static('public'));

module.exports = app; // 👈 QUAN TRỌNG