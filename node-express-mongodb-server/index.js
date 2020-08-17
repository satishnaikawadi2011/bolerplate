require('dotenv').config();

const express = require('express');
const connectDB = require('./db/db');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const HttpError = require('./models/http-error');
// /Users/satish/mongodb/bin/mongod.exe  --dbpath=/users/satish/mongodb-data
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());
// app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Define Routes

// middleware for route request which doesn't exist
app.use((req, res, next) => {
	const error = new HttpError('Could not find this route', 404);
	throw error;
});

// app.use((error, req, res, next) => {
// 	if (req.file) {
// 		fs.unlink(req.file.path, (err) => {
// 			console.log(err);
// 		});
// 	}
// 	if (res.headerSent) {
// 		return next(error);
// 	}
// 	res.status(error.code || 500);
// 	res.json({ message: error.message || 'An unknown error occurred!' });
// });

// error handling midleware
app.use((err, req, res, next) => {
	if (res.headerSent) {
		return next(err);
	}
	res.status(err.code || 500);
	res.json({ message: err.message || 'An unknown error occurred' });
});

// Serve static assets in production

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
