// Import mySQL dependency
const mysql = require('mysql');

// Connecting to the mySQL database
const db = mysql.createConnection({
    host : "localhost",
    user : "alan",
    password : process.env.MYSQL_DB_PASS,
    database : "node-rest-shop"
});

module.exports = db;