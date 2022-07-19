const conn = require('../controllers/mysqlconnection');
const util = require('util');
const jwt = require('jsonwebtoken');
const { query } = require('express');
const fs = require('fs');
require('dotenv').config();

receta = {}

receta.reg = async (req, res)=>{
    let Usuario, Receta;
    const Fecha = new Date();

    const validatoken = async function (Token){
        const decoded = jwt.verify(Token, process.env.SECRET);
        const user = decoded.id;
        return user
    }

    const registrareceta = async function (Texto, Usuario, Costo, Cocina, Lugar, Tiempo, Dificultad, Porciones){
        try{
        const queryR = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsR = queryR('insert into Receta (Texto, Fecha, Usuario, Costo, Tipo_de_cocina, Lugar, Tiempo, Dificultad, Porciones, Likes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', [Texto, Fecha, Usuario, Costo, Cocina, Lugar, Tiempo, Dificultad, Porciones]);
        return rowsR;
        }catch(error){
            res.send({Mensaje: 'No se pudo registrar la receta', Error: error}).status(400);
        }
    }

    const creacarpeta = async function (Receta, Usuario, Imagen){
        let path = `./img/${Usuario}/${Receta}`;
        if(!fs.existsSync(path)) {const newdir = await fs.mkdirSync(path, {recursive: true});}
        //path = `${path}/${Imagen.name}`;
        return path;
    }

    const guardarimagen = async function (path){
        const moved = await image.mv(path);
        return moved;
    }

    validatoken(req.body.Token).then((user) => {
        console.log(user);
        registrareceta(req.body.Texto, user, req.body.Costo, req.body.Cocina, req.body.Lugar, req.body.Tiempo, req.body.Dificultad, req.body.Porciones).then((rowsR)=>{
            console.log(rowsR.insertId);
            creacarpeta(rowsR.insertId, user, req.files.Imagen).then((path) =>{
                console.log(path);
                guardarimagen(path).then((moved) =>{
                    console.log(moved);
                })
            })
        })
    });

    res.send({Mensaje: 'Receta registrada con éxito.'}).status(200); 
}

module.exports = receta; 
