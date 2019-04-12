const mysql = require('mysql');
const constants = require('../model/Constants');

//Obtiene de manera asíncrona el resultado de una consulta
function obtenerUsuarios(callback)
{
    //Crea la conexión
    let connection = mysql.createConnection(constants.connectionObject);
    connection.connect((error) => {
        if(error)
            throw error;
    });

    //Arma la consulta, la realiza y regresa de manera asíncrona el resultado
    let consulta = 'SELECT * FROM usuario';
    connection.query(consulta, (error, resultado) => {
        if(error)
            throw error;

        callback(resultado);
    });

    connection.end();
}

//Obtiene de manera asincrona el resultado de un usuario
function obtenerUsuario(id, callback)
{
    //Crea la conexion
    let connection = mysql.createConnection(constants.connectionObject);
    connection.connect((error) => {
        if(error)
            throw error;
    });

    //Arma la consulta, la realiza y regresa el resultado por asincronismo
    let consulta = 'SELECT * FROM usuario WHERE id = ?';
    connection.query(consulta, [id], (error, resultado) => {
        if(error)
            throw error;

        callback(resultado[0]);
    });

    connection.end();
}

//Inserta un nuevo usuario
function insertarUsuario(usuario, callback)
{
    //Crea la conexion
    let connection = mysql.createConnection(constants.connectionObject);
    connection.connect((error) => {
        if(error)
            throw error;
    });

    //Arma la peticion, la realiza y regresa un resultado por asincronismo
    let insertar = "INSERT INTO usuario(nombre, direccion, telefono, usuario_id) VALUES (?, ?, ?, ?)";
    connection.query(insertar, [usuario.nombre, usuario.direccion, usuario.telefono, usuario.usuario_id], (error, resultado) => {
        if(error)
            throw error;

        callback(resultado);
    });
}

exports.obtenerUsuarios = obtenerUsuarios;
exports.obtenerUsuario = obtenerUsuario;
exports.insertarUsuario = insertarUsuario;