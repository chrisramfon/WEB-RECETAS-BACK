const conn = require('../controllers/mysqlconnection');
const util = require('util');
const jwt = require('jsonwebtoken');

perfil = {}

perfil.buscar = async (req, res)=>{

    if(req.body.Token){
        try{
            const decoded = await jwt.verify(req.body.Token, 'Secreto');
            const user = decoded.id;
        
            const queryP = util.promisify(conn.conf.query).bind(conn.conf);
            const rowsP = await queryP('select Us.Usuario, Per.Nombre, Per.Correo, Per.Bio, Per.Pinned from Usuario Us join Perfil Per on Per.Usuario like Us.Usuario where Us.id = ?', [user])
            res.send(rowsP).status(200);
        }catch(error){
            res.send({Mensaje: 'No se pudo buscar el perfil', Error: error}).status(400);
        }
    }else if(req.body.id){
        try{
        
            const queryP = util.promisify(conn.conf.query).bind(conn.conf);
            const rowsP = await queryP('select Us.Usuario, Per.Nombre, Per.Correo, Per.Bio, Per.Pinned from Usuario Us join Perfil Per on Per.Usuario like Us.Usuario where Us.id = ?', [req.body.id])
            res.send(rowsP).status(200);
        }catch(error){
            res.send({Mensaje: 'No se pudo buscar el perfil', Error: error}).status(400);
        }
    }else{
        res.send({Mensaje: 'Enviar Token o id'}).status(400);
    }

}

module.exports = perfil;