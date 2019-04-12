const dao = require('../controller/usuarioDAO');

//Vista que muestra el resultado de la consulta
function getUsuario(request, respond)
{
    dao.obtenerUsuarios((resultado) => {
        
        //Imprime el resultado de la consulta
        respond.end(JSON.stringify(resultado));
    });
}

exports.getUsuario = getUsuario;