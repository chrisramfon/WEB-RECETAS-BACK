const conn = require('../controllers/mysqlconnection');
const util = require('util');
const jwt = require('jsonwebtoken');
const { query } = require('express');
const fs = require('fs');
require('dotenv').config();


receta = {}

receta.reg = async (req, res)=>{
    //Guarda la fecha del servidor en una variable llamada fecha
    const Fecha = new Date();

    try{
        if(!req.body.Token) throw {Mensaje: "No se recibió el token.", Status: 0};

        // Verifica el Token y extrae el id para guardarlo en una variable llamada user
        const Token = req.body.Token;
        const decoded = jwt.verify(Token, process.env.SECRET);
        const user = decoded.id;

        
        
    
        //Guarda los datos en la tabla llamada Receta y guarda el id de la receta en idR
        //const queryR = util.promisify(conn.conf.query).bind(conn.conf);
        //const rowsR = queryR('insert into Receta (Texto, Fecha, Usuario, Costo, Tipo_de_cocina, Lugar, Tiempo, Dificultad, Porciones, Likes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', [req.body.Texto, Fecha, user, req.body.Costo, req.body.Cocina, req.body.Lugar, req.body.Tiempo, req.body.Dificultad, req.body.Porciones]);
        
    
     
        
        /*let path = `./img/${user}/4`;
        if(!fs.existsSync(path)) {const newdir = await fs.mkdirSync(path, {recursive: true});}
        const image = req.files.Imagen;
        path = `${path}/${image.name}`;
        const moved = await image.mv(path);

        const queryI = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsI = queryI('insert into Receta_Imagen (Imagen, )');*/
        conn.conf.query('insert into Receta (Texto, Fecha, Usuario, Costo, Tipo_de_cocina, Lugar, Tiempo, Dificultad, Porciones, Likes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', [req.body.Texto, Fecha, user, req.body.Costo, req.body.Cocina, req.body.Lugar, req.body.Tiempo, req.body.Dificultad, req.body.Porciones], function async (error, results, fields){
            if (error) throw error;

            const rID = results.insertId;
            const path = `./img/${user}/${rID}`;

            if(!fs.existsSync(path)) {
                fs.mkdirSync(path, {recursive: true}, (dir)=>{
                    const image = req.files.Imagen;
                    image.mv(path);
                });
            }
        });
    }catch(error){
        res.send({Mensaje: "No se pudo registrar la receta", Error: error}).status(400);
    }

    

    res.send({Mensaje: 'Receta registrada con éxito.'}).status(200);
    
}



module.exports = receta; 

//fs.writeFile(newPath, data, function (err) {
//const dir = `./img/1/1`;
//if(!fs.existsSync(dir)) { const newdir = await fs.mkdirSync(dir, {recursive: true});}