const conn = require('../controllers/mysqlconnection');
const bcrypt = require('bcrypt');
const util = require('util');

const register = {}

register.reg = async(req, res)=>{
    try{
        const pass = "Instala1.";
        const salt = await bcrypt.genSalt(10);
        const encrypted = await bcrypt.hash(pass, salt);

        const queryE  = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsE = await queryE('insert into Usuario (Usuario, Pass, Status) values (?, ?, 1)', ['chrisramfon', encrypted]);
        const respuesta = {Mensaje: "Usuario registrado con éxito."}
        res.send(respuesta).status(200);
    }catch(error){
        respuesta = {mensaje: "No se pudo registrar el usuario.", Error: error}
        res.send(respuesta).status(400);
    }
}





