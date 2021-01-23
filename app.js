const express = require('express');
const path = require('path');

const app = express();
const { PORT = 3000 } = process.env;
const router = require('./routes/router');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(PORT);
