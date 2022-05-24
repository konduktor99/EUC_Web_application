var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var unicycleRouter = require('./routes/unicycleRoute');
var partRouter = require('./routes/partRoute');
var assemblyRouter = require('./routes/assemblyRoute');
var uniApiRouter = require('./routes/api/UnicycleApiRoute');
var assemApiRouter = require('./routes/api/AssemblyApiRoute');
var partApiRouter = require('./routes/api/PartApiRoute');

//mp3
var authUtils = require('./util/authUtils');
const session = require('express-session'); //mp3
const res = require('express/lib/response');

const i18n = require('i18n');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//mp3
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik 
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'ekolo-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o 

});
app.use(i18n.init);

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['ekolo-lang'];
      res.locals.lang = currentLang;
  }
  next();
});

app.use(session({
  secret: ' my_secret_password',
  resave: false
}));
app.use((req, res, next) =>{
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  if(!res.locals.registerError){
    res.locals.registerError = undefined;
  }
  next();
});



app.use('/', indexRouter);
app.use('/unicycles', unicycleRouter);
app.use('/parts',  partRouter);
app.use('/assemblies',  assemblyRouter);
app.use('/api/unicycles', uniApiRouter);
app.use('/api/assemblies', assemApiRouter);
app.use('/api/parts', partApiRouter);


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

module.exports = app;
