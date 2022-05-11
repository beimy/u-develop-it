// EXPRESS IMPORTS
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// MySQL IMPORTS
const mysql = require('mysql2');
// DOTENV IMPORTS
require('dotenv').config();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: process.env.host,
        // Your MySQL username
        user: process.env.user,
        // Your MySQL password
        password: process.env.password,
        database: process.env.database
    },

    console.log('Connected to the election database.')
);

// Database Queries
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }

//     console.log(row);
// });

// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }

//     console.log(result);
// });

// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log(result);
// });

// Express ROUTES

// Default response for any other request (Not found)
app.use((req, res) => {
    res.sendStatus(404).end();
});


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});