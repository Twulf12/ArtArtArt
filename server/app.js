const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'artartart'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Host static files from 'public' directory

// CORS Middleware to disable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// File upload setup
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
}).single('file');

// Routes
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send('Error occurred during file upload');
        } else {
            console.log('File Uploaded');
            const savedFileName = req.file.filename;  // Get the saved file name
            res.send({
                fileName: savedFileName  // Include the file name in the response
            });
        }
    });
});

app.post('/execute-query', (req, res) => {
    const query = req.body.query;
    console.log("Executing query: ", query)
    db.query(query, (err, results) => {
        if (err) {
            res.send('Error in query execution');
        } else {
            res.json(results);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
