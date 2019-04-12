const dao = require('../controller/usuarioDAO');

//Vista que muestra el resultado de la consulta
function getUsuarios(request, respond)
{
    dao.obtenerUsuarios((resultado) => {
        
        //Imprime el resultado de la consulta
        respond.set({'content-type': 'application/json; charset=utf-8'});
        respond.end(JSON.stringify(resultado));
    });
}

//Vista que muestra un solo usuario
function getUsuario(id, request, respond)
{
    dao.obtenerUsuario(id, (resultado) => {
        //Imprime el resultado de la consulta
        respond.set({'content-type': 'application/json; charset=utf-8'});
        respond.end(JSON.stringify(resultado));
    });
}

//Vista que inserta a un usuario
function setUsuario(usuario, request, respond)
{
    dao.insertarUsuario(usuario, (resultado) => {
        //Imprime el resultado de la consulta
        respond.set({'content-type': 'application/json; charset=utf-8'});
        
        //Si insertó regresa el ultimo id, si no regresa vacío
        let elemento = new Object();
        if(resultado.affectedRows > 0)
        {
            elemento.id = resultado.insertId;
            respond.end(JSON.stringify(elemento));
        }
        else
            respond.end(JSON.stringify(elemento));
        
    });
}

//Vista que actualiza un usuario
function updateUsuario(usuario, request, respond)
{
    dao.actualizarUsuario(usuario, (resultado) => {
        //Imprime el resultado de la consulta
        respond.set({'content-type': 'application/json; charset=utf-8'});

        //Si actualizo correctamente regresa los elementos que actualizo
        let elemento = new Object();
        if(resultado.changedRows > 0)
        {
            elemento.changedRows = resultado.changedRows;
            respond.end(JSON.stringify(elemento));
        }
        else
            respond.end();
    });
}

exports.getUsuarios = getUsuarios;
exports.getUsuario = getUsuario;
exports.setUsuario = setUsuario;
exports.updateUsuario = updateUsuario;