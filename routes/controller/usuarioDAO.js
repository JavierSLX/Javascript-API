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
    })

    //Arma la consulta, la realiza y regresa de manera asíncrona el resultado
    let consulta = 'SELECT * FROM usuario';
    connection.query(consulta, (error, resultado) => {
        if(error)
            throw error;

        callback(resultado);
    });

    connection.end();
}

exports.obtenerUsuarios = obtenerUsuarios;