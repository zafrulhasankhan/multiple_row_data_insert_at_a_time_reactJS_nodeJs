var mysql        = require('mysql');

var connection   = mysql.createConnection({

  supportBigNumbers: true,

  bigNumberStrings: true,

  host     : "localhost",

  user     : "root",

  password : "",

  database : "attendance_system_node_react"

});

module.exports = connection;