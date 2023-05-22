const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'BaInDatabase'
});

connection.connect();

// close the connection
connection.end();