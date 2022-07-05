const conn = require('../controllers/mysqlconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
require('dotenv').config();

login = {}

login.log = async(req, res) => {
    
    try{
    //Busca al usuario en la base de datos
    const queryL = util.promisify(conn.conf.query).bind(conn.conf);
    const rowsL = await queryL('select * from Usuario where Usuario like ?', [req.body.Usuario]);
    if(rowsL <= 0) throw 'No se encontró el usuario';
    
    //Valida que la contraseña coincida
    const encripted = rowsL[0].Pass;
    const compare = await bcrypt.compare(req.body.Pass, encripted);
    if(!compare) throw 'La contraseña no coinside';
    
    //Genera el token
    const payload = {id: rowsL[0].id};
    const token = await jwt.sign(payload, process.env.SECRET);

    //Envía el token generado
    res.send({Mensaje: `Bienvenido ${rowsL[0].Usuario}`, Totken: token});
    }catch(error){
        res.send({Mensaje: "Usuario o contraseña invalidos.", Error: error})
    }

}

module.exports = login;
