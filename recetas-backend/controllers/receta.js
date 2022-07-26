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
        const decoded = jwt.verify(Token, 'Secreto');
        const user = decoded.id;
        Usuario = user;
        return user
    }

    const registrareceta = async function (Titulo, Texto, Usuario, Costo, Cocina, Lugar, Tiempo, Dificultad, Porciones){
        try{
        const queryR = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsR = queryR('insert into Receta (Titulo,Texto, Fecha, Usuario, Costo, Tipo_de_cocina, Lugar, Tiempo, Dificultad, Porciones, Likes) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', [Titulo, Texto, Fecha, Usuario, Costo, Cocina, Lugar, Tiempo, Dificultad, Porciones]);
        return rowsR;
        }catch(error){
            res.send({Mensaje: 'No se pudo registrar la receta', Error: error}).status(400);
        }
    }

    const creacarpeta = async function (Receta, Usuario){
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
        return user;
    })
    .then((Usuario) => registrareceta(req.body.Titulo, req.body.Texto, Usuario, req.body.Costo, req.body.Cocina, req.body.Lugar, req.body.Tiempo, req.body.Dificultad, req.body.Porciones))
    .then((rowsR => creacarpeta(rowsR.insertId, Usuario)))
    .then((path) => console.log(path)) //mover imagen cuando funcione el front
    

    res.send({Mensaje: 'Receta registrada con éxito.'}).status(200); 
}

receta.explore = async (req, res)=>{

    try{
        const queryE = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsE = await queryE('select Re.id, Re.Titulo, Re.Tipo_de_cocina, Us.Usuario from Receta Re join Usuario Us on Us.id = Re.Usuario;');

        res.send(rowsE).status(200);
    }catch(error){
        res.send({Mensaje: 'No se pudieron consultar las recetas', Error: error})
    }
}

module.exports = receta; 
