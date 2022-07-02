var mysql = require('mysql');
require('dotenv').config();

const mysqlconnection = {}

mysqlconnection.conf =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Instala1.",
    database: "recetas"
});

module.exports = mysqlconnection;