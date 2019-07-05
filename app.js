// Libraries:
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Our routes:
const routeRoutes = require('./routes/route');
const userRoutes = require('./routes/user');

//initialize the app:
const app = express();

// Connect to the mongo db atlas.
mongoose.connect(
	'mongodb+srv://lalo:' + process.env.MONGO_ATLAS_PW + '@meancourse-yrcmk.mongodb.net/hackatoncito-gobus?retryWrites=true&w=majority',
	{ useCreateIndex: true, useNewUrlParser: true }
).then(() => {
		console.log('connected to database !');
	})
	.catch((error) => {
		console.log('connection failed!');
		console.log('error: ', error);
	});

// with this, we parse the body always as json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// This will avoid the CORS issue;
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
	next();
});

// filtered the routes to have always '/api/routes' always.
app.use('/api/routes', routeRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
