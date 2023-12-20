const express = require('express');
const path = require('path');
const cors = require("cors");
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const indexRouter = require('./routes/index');
const bookingRouter = require('./routes/booking');
const houseRouter = require('./controllers/housecontr')
// const SearchLocation = require('./routes/api/SearchLocations')
// const api_key = '';


const app = express();
app.use(express.json());
app.use(cors()); //Разрешение на cors

// const server = http.createServer(app);
// app.set('port' , 4200)
app.use(express.static(__dirname + '/public'));
// app.use('/index', indexRouter);
app.use('/', bookingRouter);
app.use('/api/house', houseRouter);
module.exports = app;

async function connectToMongoDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/booking')
    .then(() => console.log('Соединение с MongoDB установлено'))
    .catch(err => console.error('Ошибка соединения с MongoDB:', err));
    }

  const PORT = 8080
app.listen(PORT, () => {
  connectToMongoDB();
  console.log("http://localhost:8080");
});