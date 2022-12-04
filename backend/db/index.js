
const mysql = require('mysql2');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const pool = mysql.createPool({
  connectionLimit: 1000,
  host     : DB_HOST,
  port     : DB_PORT,
  user     : DB_USER,
  password : DB_PASSWORD,
  database : DB_NAME
});


pool.getConnection((err, connection) => {
  if (err) throw err
  // console.log('connection id: ' + connection.threadId )
})

module.exports  = pool
