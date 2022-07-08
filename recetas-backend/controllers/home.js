const conn = require('../controllers/mysqlconnection');
const util = require('util');
const jwt = require('jsonwebtoken');
const { query } = require('express');
require('dotenv').config();

home = {}

home.show = async(req, res)=>{
    try{
        if(!req.body.Token) throw {Mensaje: "No se recibió el token.", Status: 0};

        const Token = req.body.Token;
        const decoded = jwt.verify(Token, process.env.SECRET);
        const user = decoded.id;

        console.log(user);


        res.send(200);
    }catch(error){
        res.send({Mensaje: "No se pudo obtener las recetas", Error: error}).status(400);
    }
}

module.exports = home; 

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU3MzE3Nzk0fQ.3guerK1PiXG3MgAOGOyUrhWDo9ZZeI1X-Mau7CHuoXg


