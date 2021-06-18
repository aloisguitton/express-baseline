const response = require("./Services/Response");

const createError = require('http-errors');
const path = require("path");
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const upload = multer();
const app = express();

const Router = require('./routes/routes');

process.env.TZ = '+00:00'

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(upload.any());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/', Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.ENV === 'dev' ? err : {};

    // render the error page
    response.error(res)
    //res.render('error');
});
module.exports = app;