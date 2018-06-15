// Import mySQL dependency
const mysql = require('mysql');

// Connecting to the mySQL database
const db = mysql.createConnection({
    host : process.env.MYSQL_DB_HOST,
    user : process.env.MYSQL_DB_USER,
    password : process.env.MYSQL_DB_PASS,
    database : process.env.MYSQL_DB_DATABASE
});

module.exports = db;