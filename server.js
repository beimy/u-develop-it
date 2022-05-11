const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express ROUTES

// Default response for any other request (Not found)
app.use((req, res) => {
    res.sendStatus(404).end();
});


app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});