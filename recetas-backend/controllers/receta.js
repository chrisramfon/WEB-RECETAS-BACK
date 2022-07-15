const conn = require('../controllers/mysqlconnection');
const util = require('util');
const jwt = require('jsonwebtoken');
const { query } = require('express');
const fs = require('fs');
require('dotenv').config();


receta = {}

receta.reg = async (req, res)=>{
    try{
        if(!req.body.Token) throw {Mensaje: "No se recibió el token.", Status: 0};
        if(!req.file) throw {Mensaje: "No se recibió ninguna imagen.", Status: 0};

        const Token = req.body.Token;
        const decoded = jwt.verify(Token, process.env.SECRET);
        const user = decoded.id;

        let Fecha = new Date();
    
        const queryR = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsR = queryR('insert into Receta (Texto, Fecha, Usuario, Costo, Tipo_de_cocina, Lugar, Tiempo, Dificultad, Porciones, Likes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', [req.body.Texto, Fecha, user, req.body.Costo, req.body.Cocina, req.body.Lugar, req.body.Tiempo, req.body.Dificultad, req.body.Porciones]);

        

        res.send({Mensaje: 'Receta registrada con éxito.'}).status(200);
    }catch(error){
        res.send({Mensaje: "No se pudo registrar la receta", Error: error}).status(400);
    }
}

receta.img = async (req, res)=>{
    try{
        const dir = `/img`;
    if(!fs.existsSync(dir)) { 
        
        const newdir = await fs.mkdirSync(dir, {recursive: true});
        
        console.log(newdir);
    }
    res.send(200);
    }catch(e){
        res.send(e).status(400);
    }
}

module.exports = receta; 