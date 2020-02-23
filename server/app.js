const express = require('express');
const routes = require('./route');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Setup express app
const app = express();

// Connecting to the MongoDB database
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, 'useCreateIndex': true });
mongoose.Promise = global.Promise;

// Setting up a port variable
const PORT = process.env.PORT || 5000;

// Reading the body and parsing it into json
app.use(bodyParser.json());

// error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
})

//Initalize routes
app.use('/api', routes);

// Listen for requests
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))