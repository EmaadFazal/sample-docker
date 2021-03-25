var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playerRouter = require('./routes/playerRoute')
var cors = require('cors')
var app = express();
const players = require('./models/BaseballSchema')

app.use(cors())
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello',async function(req,res){
  const player = await players.find({}).limit(2)
  console.log(player)
  res.send("hello world 5")
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/player',playerRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose
  .connect(
    'mongodb://mongo:27017/MLB',
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
app.listen(8080, () => {
  console.log('Listening on port 8080');
});

module.exports = app;
