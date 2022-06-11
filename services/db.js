const mysql = require('mysql2');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "admin",
 database: "todos",
});

conn.connect();
conn.on('error', function(err) {
    console.log("[mysql error]",err);
  });

module.exports = conn;
