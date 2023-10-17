require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

app.use(cors());

const socialPostRoutes = require('./routes/socialPosts');
const accountRoutes = require('./routes/accounts');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Set the file name
    },
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/socialPosts', socialPostRoutes);
app.use('/api/accounts', accountRoutes);

// Connect to the database and start the server
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to the database and listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

process.env;
