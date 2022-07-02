const conn = require('../controllers/mysqlconnection');
const bcrypt = require('bcrypt');
const util = require('util');

const register = {}

register.reg = async(req, res)=>{

    //Es un callback que verifica que el usuario no esté en la base de datos
    conn.conf.query('select * from Usuario where Usuario like ?', [req.body.Usuario], function(error, results, fields) {
        if(results.length >= 1) throw 'Usuario no disponible'
    });

    //Es un callback que revisa que el correo no esté en la base de datos
    conn.conf.query('select * from Perfil where Correo like ?', [req.body.Correo], function(error, results, fields) {
        if(results.length >= 1) throw 'Correo invalido'
    });

    try{
        //Encripta la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const encrypted = await bcrypt.hash(req.body.Pass, salt);

        //Registra los datos en la tabla llamada Usuario
        const queryU = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsU = await queryU('insert into Usuario (Usuario, Pass, Status) values (?, ?, 1)', [req.body.Usuario, encrypted]);
        

        res.send(`Usuario ${req.body.Usuario} registrado con éxito.`).status(200);
    }catch(e){
        throw 'No se pudo registrar el usuario `${e}`';
    }
}

module.exports = register;


/*try{
    const queryU = util.promisify(conn.conf.query).bind(conn.conf);
    const rowsU = await queryU('select * from Usuario where Usuario like ?', [req.body.Usuario]);
    console.log(rowsU.Usuario);

    //const pass = "Instala1.";
    //const salt = await bcrypt.genSalt(10);
    //const encrypted = await bcrypt.hash(pass, salt);

    //const queryE  = util.promisify(conn.conf.query).bind(conn.conf);
    //const rowsE = await queryE('insert into Usuario (Usuario, Pass, Status) values (?, ?, 1)', ['chrisramfon', encrypted]);
    //const respuesta = {Mensaje: "Usuario registrado con éxito.", Datos: rowsU}
    res.send('bien').status(200);
}catch(error){
    respuesta = {mensaje: "No se pudo registrar el usuario.", Error: error}
    res.send(respuesta).status(400);
}*/