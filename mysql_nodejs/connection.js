const mysql = require('mysql')

//configuration for mysql database
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dactor_db',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected")
    }
    else {
        console.log("Failed to connect")
    }
})

module.exports = mysqlConnection