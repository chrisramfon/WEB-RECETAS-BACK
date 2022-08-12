var mysql = require('mysql');
require('dotenv').config();

const mysqlconnection = {}

mysqlconnection.conf =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "recetas"
});

module.exports = mysqlconnection;