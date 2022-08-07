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

//Funcion para validar si un usuario ya sigue a otro
perfil.validaseguido = async (req, res)=>{

    let follower
    let followed = req.body.id

    const validatoken = async function (Token){
        const decoded = jwt.verify(Token, 'Secreto');
        const user = decoded.id;
        follower = user
        return user;
    }

    const buscaseguido = async function(follower, followed){
        let rows = 5;
        if(follower == followed) return rows;
        const queryS = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsS = queryS('select * from Seguido where Usuario = ? and Seguidor = ?', [followed, follower]);
        return rowsS;
    }

    const validaseguido = async function (rowsS){
        if(rowsS == 5){
            res.send({Seguido: false, rows: rowsS, Mensaje: 'Es el mismo usuario'}).status(200);
        }else if(rowsS <= 0){
                res.send({Seguido: false, rows: rowsS}).status(200);
        }else{
            res.send({Seguido: true, rows: rowsS}).status(200);
        }
    }

    validatoken(req.body.Token)
    .then((user) => buscaseguido(user, followed))
    .then ((rowsS)=> validaseguido(rowsS));
}

perfil.seguir = async (req, res) => {
    try{
        const decoded = jwt.verify(req.body.Token, 'Secreto');
        const user = decoded.id;

        const queryS = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsS = await queryS ('insert into Seguido (Usuario, Seguidor) values(?, ?)', [req.body.id, user]);
        res.send({Mensaje: 'Usuario seguido', rows: rowsS});
    }catch(error){
        res.send({Mensaje: 'No se pudo seguir al usuario'}).status(400);
    }
}

perfil.dejarseguir = async (req, res) => {
    try{
        const decoded = jwt.verify(req.body.Token, 'Secreto');
        const user = decoded.id;

        const queryD = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsD = await queryD('delete from seguido where Usuario = ? and Seguidor = ?', [req.body.id, user]);
        res.send({Mensaje: 'Usuario dejado de seguir', rows: rowsD});
    }catch(error){
        res.send({Mensaje: 'No se pudo eliminar de la tabla', Error: error})
    }
}

module.exports = perfil;