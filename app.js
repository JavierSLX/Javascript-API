var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const usuario = require('./routes/view/usuario');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//_____________________ ACCIONES DE API ____________________________________

//Peticion GET para mostrar todos los usuarios
app.get('/usuarios', (request, respond) => {
  
  //Checa si es personalizada (.../usuario?id=1) o general
  let peticiones = request.query;
  let id = peticiones.id; 
  
  if(id)
    usuario.getUsuario(id, request, respond);
  //Si el objeto de peticiones viene vacio
  else if(Object.keys(peticiones).length == 0)
    usuario.getUsuarios(request, respond);
  else
    respond.end("No valido");
  
});

//Peticion POST para mostrar un usuario
app.post('/usuario', (request, respond) => {
  
  let peticiones = request.body;
  let id = peticiones.id;

  if(id)
    usuario.getUsuario(id, request, respond);
  //Si el objeto de peticiones viene vacio
  else if(Object.keys(peticiones).length == 0)
    usuario.getUsuarios(request, respond);
  else
    respond.end("No valido");
});

//Peticion POST para insertar un usuario
app.post('/insertarUsuario', (request, respond) => {
  let persona = request.body;

  usuario.setUsuario(persona, request, respond);
});

//Peticion POST para actualizar un usuario
app.post('/actualizarUsuario', (request, respond) => {
  let persona = request.body;
  usuario.updateUsuario(persona, request, respond);
});

//___________________________________________________________________________

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

//El servidor en el puerto que escucha
app.listen(8080, () => {
  console.log("Servidor en el puerto 8080");
})

module.exports = app;
