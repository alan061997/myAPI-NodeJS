// Import mySQL dependency
const mysql = require('mysql');

// Connecting to the mySQL database
const db = mysql.createConnection({
    host : "localhost",
    user : "alan",
    password : "1234",
    database : "node-rest-shop"
});

module.exports = db;