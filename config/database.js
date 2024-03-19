const knex = require('knex');

const dbConfig =  {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
};
  
// Create a Knex instance
const db = knex(dbConfig);

// Test the database connection
db.raw('SELECT 1+1 as result')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });

module.exports = db;

