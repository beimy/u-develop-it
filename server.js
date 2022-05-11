// EXPRESS IMPORTS
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// MySQL IMPORTS
const mysql = require('mysql2');
// DOTENV IMPORTS
require('dotenv').config();
// Other IMPORTS
const inputCheck = require('./utils/inputCheck');

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

app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


// Delete a candidate

app.delete('/api/candidate/:id', (req, res) => {
    sql = `DELETE FROM candidates WHERE id = ?`;
    params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                 VALUES (?,?,?)`;

    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});






// Express ROUTES

// Default response for any other request (Not found)
app.use((req, res) => {
    res.sendStatus(404).end();
});


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});