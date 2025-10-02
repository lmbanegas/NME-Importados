var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const serverless = require("serverless-http");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// --- Configuración de vistas ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- Middlewares ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// --- Rutas ---
app.use('/', indexRouter);
app.use('/users', usersRouter);

// --- Exportar como función serverless ---
module.exports = app;
module.exports.handler = serverless(app);
