require('dotenv').config();
var createError = require('http-errors');

const express = require('express')
// const url = require("url");
// const fetch = require('node-fetch');
const bodyParser = require('body-parser')


const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');

const cors = require('cors')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

console.log(process.env.NODE_ENV);

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = 9886;
app.use(express.json());

app.get("/",  cors(), indexRouter);

app.use('/api', cors(), apiRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use('/', indexRouter);


module.exports = app;