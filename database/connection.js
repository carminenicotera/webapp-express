const mysql2 = require('mysql2')
const connection = mysql2.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password!',
  database: process.env.DB_NAME || 'your_database_name'
})

connection.connect((err) => {
  if(err) {
    console.log('Error connecting to database:', err);
    return
  }
  console.log('Connected to the MySQL database!');
})

module.exports = connection