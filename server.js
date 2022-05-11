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
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// Express ROUTES

// Default response for any other request (Not found)
app.use((req, res) => {
    res.sendStatus(404).end();
});


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});