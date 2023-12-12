const OpenApiValidator = require('express-openapi-validator'); 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const bookingRouter = require('./routes/booking');
const SearchLocation = require('./routes/api/SearchLocations')
const api_key = '';

const app = express();
console.log('hey hey')

const server = http.createServer(app);
app.set('port' , 4200)
app.use(express.static(__dirname + '/public')); 
// app.use('/index', indexRouter);
app.use('/', bookingRouter);
// app.use('/housing', houseRouter);
module.exports = app;
