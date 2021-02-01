const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('open', () => console.log('DB connected!'));
mongoose.connection.on('error', () => console.log('Error connected!'));

app.use((req, res, next) => {
  req.user = {
    _id: '601824c0f73d442bf0addff2', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT);
