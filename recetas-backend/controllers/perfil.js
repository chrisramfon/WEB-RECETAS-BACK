const conn = require('../controllers/mysqlconnection');
const util = require('util');
const jwt = require('jsonwebtoken');

perfil = {}

//Funcion para buscar un perfil usando el token o id
perfil.buscar = async (req, res)=>{

    if(req.body.Token){
        try{
            const decoded = await jwt.verify(req.body.Token, 'Secreto');
            const user = decoded.id;
        
            const queryP = util.promisify(conn.conf.query).bind(conn.conf);
            const rowsP = await queryP('select Us.id, Us.Usuario, Per.Nombre, Per.Correo, Per.Bio, Per.Pinned from Usuario Us join Perfil Per on Per.Usuario like Us.Usuario where Us.id = ?', [user])
            res.send(rowsP).status(200);
        }catch(error){
            res.send({Mensaje: 'No se pudo buscar el perfil', Error: error}).status(400);
        }
    }else if(req.body.id){
        try{
        
            const queryP = util.promisify(conn.conf.query).bind(conn.conf);
            const rowsP = await queryP('select Us.id, Us.Usuario, Per.Nombre, Per.Correo, Per.Bio, Per.Pinned from Usuario Us join Perfil Per on Per.Usuario like Us.Usuario where Us.id = ?', [req.body.id])
            res.send(rowsP).status(200);
        }catch(error){
            res.send({Mensaje: 'No se pudo buscar el perfil', Error: error}).status(400);
        }
    }else{
        res.send({Mensaje: 'Enviar Token o id'}).status(400);
    }

}



//Funcion para obtener el número de seguidores de un perfil
perfil.seguidores = async (req, res)=>{
    try{
        const queryS = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsS = await queryS('select COUNT(*) as Seguidores from seguido se where se.Usuario = ?', [req.body.id]);
        res.send(rowsS).status(200);
    }catch(error){
        res.send({Mensaje: `No se pudieron buscar los usuarios que siguen al perfil ${req.body.id}`, Error: error}).status(200);
    }
}

//Funcion para obtener el numero de usuarios que sigue un perfil
perfil.seguidos = async (req, res)=>{
    try{
        const queryS = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsS = await queryS('select COUNT(*) as Seguidos from seguido se where se.Seguidor = ?', [req.body.id]);
        res.send(rowsS).status(200);
    }catch(error){
        res.send({Mensaje: `No se pudo obtener la lista de seguidos del perfil ${req.body.id}`, Error: error}).status(400);
    }
}

module.exports = perfil;