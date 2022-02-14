const path = require('path');
const logger = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const process = require('./utils/process')
const mongoUtil = require('./utils/db');
const fileUpload = require('express-fileupload');
const user = require('./routes/user');
const passport = require( 'passport');
mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(fileUpload());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var securityCheck = function (req, res, next) {
    if ("piyush55" == process.env_production.TOKEN) next();
    else throw new Error('BROKEN');
}

app.use(function (req, res, next) {
    res.header('Access-Control-Expose-Headers', 'Access-Control-*');
    res.header('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    next();
});

app.use(securityCheck);


app.use('/user', user);

app.use(function (req, res, next) {
    res.send({ 'success': false, 'data': "404 Not Found" });
    return;
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env_production') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
