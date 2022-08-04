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
        return path;
    }

    const guardarimagen = async function (path){
        const image = req.file
        //const moved = await fs.mv(path)
        //return moved;
        console.log('archivo'+image);
        console.log('Ruta '+path);
        return "Imagen movida";
    }

    validatoken(req.body.Token).then((user) => {
        console.log(user);
        return user;
    })
    .then((Usuario) => registrareceta(req.body.Titulo, req.body.Texto, Usuario, req.body.Costo, req.body.Cocina, req.body.Lugar, req.body.Tiempo, req.body.Dificultad, req.body.Porciones))
    .then((rowsR => creacarpeta(rowsR.insertId, Usuario)))
    .then((path) => guardarimagen(path))
    .then((moved) =>res.send(moved).status(200)) //mover imagen cuando funcione el front
    

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

receta.encontrar = async (req, res)=>{

    const buscareceta = async function (id){
        try{
            const queryR = util.promisify(conn.conf.query).bind(conn.conf);
            const rowsR = queryR('select Re.id, Re.Titulo, Re.Texto, Re.Likes, Re.Fecha, Re.Costo, Re.Tipo_de_cocina, Re.Lugar, Re.Tiempo, Re.Dificultad, Re.Porciones, Us.Usuario from Receta Re join Usuario Us on Us.id = Re.Usuario where Re.id = ?;', [id]);
            return rowsR;
        }catch(error){
            return error;
        }
    }

    buscareceta(req.body.id).then((rowsR) => res.send(rowsR[0]).status(200) );

}

receta.favorito = async(req, res)=>{

    const validatoken = async function (Token){
        const decoded = jwt.verify(Token, 'Secreto');
        const user = decoded.id;
        Usuario = user;
        return {Usuario: user}
    }

    const validarfavorito = async function(Receta, user){
        try{
            const queryF = util.promisify(conn.conf.query).bind(conn.conf);
            const rowsF = queryF('select * from Favorito where Receta = ? and Usuario = ?', [Receta, user.Usuario]);
            if(rowsF => 0){
                return rowsF
            }else{
                return user.Usuario
            }
        }catch(error){
            res.send({Mensaje: 'No se pudo buscar la receta', Error: error});
        }
    }

    validatoken(req.body.Token)
    .then((user) => validarfavorito(req.body.Receta, user))
    .then((rowsF) => res.send(rowsF).status(200));
}

receta.gfavorito = async(req, res)=>{

    const validatoken = async function (Token){
        const decoded = jwt.verify(Token, 'Secreto');
        const user = decoded.id;
        return user;
    }

    const registrafavorito = async function(Usuario){
        const queryF = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsF = queryF('insert into Favorito (Receta, Usuario) values (?, ?)', [req.body.Receta, Usuario]);
        return rowsF;
    }

    validatoken(req.body.Token)
    .then((user)=> registrafavorito(user))
    .then((rowsF)=>res.send({Mensaje: 'Guardada en favoritos', rows: rowsF}).status(200));
}

receta.lfavorito = async (req, res)=>{

    const validatoken = async function (Token){
        const decoded = jwt.verify(Token, 'Secreto');
        const user = decoded.id;
        return user;
    }

    const consulta = async function(Usuario){
        const queryF = util.promisify(conn.conf.query).bind(conn.conf);
        const rowsF = await queryF('select Re.id, Re.Titulo, Re.Tipo_de_cocina,  Us.Usuario from Favorito Fa join Receta Re on Re.id = Fa.Receta join Usuario Us on Us.id = Re.Usuario where Fa.Usuario = ?', [Usuario]);
        return rowsF;
    }

    validatoken(req.body.Token)
    .then((user)=> consulta(user))
    .then((rowsF) => res.send(rowsF).status(200));
}

module.exports = receta;