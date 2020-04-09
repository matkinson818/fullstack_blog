const express = require('express');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

//Load env vars
dotenv.config({ path: './config/config.env' });

// Connecting to the MongoDB database
mongoose.connect(process.env.CONN_URI, 
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, 
      'useCreateIndex': true
    });

mongoose.Promise = global.Promise;
<<<<<<< HEAD:server/app.js

//Route files
const blogs = require('./routes/blogs');
const authRouter = require('./routes/auth');
=======
>>>>>>> 636d8e2223fd30601f333917bf130166484dbde0:app.js

// Setup express app
const app = express();

//Body Parser
app.use(express.json());

// Use logger middleware
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('tiny'));
};

<<<<<<< HEAD:server/app.js
//Mount routes
app.use('/api/v1/blogs', blogs);
app.use('/api/v1/authRouter', authRouter);

app.use(errorHandler);
=======
//Initalize routes
app.use('/api/v1/blogs', blogs);

app.use(errorHandler);

// app.use("/auth", require("./routes/auth"));
>>>>>>> 636d8e2223fd30601f333917bf130166484dbde0:app.js

// Setting up a port variable
const PORT = process.env.PORT || 5000;

// Listen for requests
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))