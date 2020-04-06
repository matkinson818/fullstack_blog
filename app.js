const express = require('express');
const blogs = require('./routes/blogs');
const authRouter = require('./routes/auth');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Load env vars
dotenv.config({ path: './config/config.env' })

// Setup express app
const app = express();

// Use logger middleware
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('tiny'));
};


// Connecting to the MongoDB database
mongoose.connect(process.env.CONN_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, 'useCreateIndex': true });
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
app.use('/api/v1/blogs', blogs);

app.use("/auth", require("./routes/auth"));

// Listen for requests
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))