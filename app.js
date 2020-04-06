const express = require('express');
const blogs = require('./routes/blogs');
const authRouter = require('./routes/auth');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const dotenv = require('dotenv');
<<<<<<< HEAD:server/app.js
=======
const bodyParser = require('body-parser');
>>>>>>> d840e21a3951d1166841a04cc14e219077628689:app.js
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

//Load env vars
<<<<<<< HEAD:server/app.js
dotenv.config({ path: './config/config.env' });
=======
dotenv.config({ path: './config/config.env' })

// Setup express app
const app = express();
>>>>>>> d840e21a3951d1166841a04cc14e219077628689:app.js

// Use logger middleware
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('tiny'));
};


// Connecting to the MongoDB database
mongoose.connect(process.env.CONN_URI, 
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, 
      'useCreateIndex': true
    });

mongoose.Promise = global.Promise;

// Setup express app
const app = express();

//Body Parser
app.use(express.json());

// Use logger middleware
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('tiny'));
};

//Initalize routes
app.use('/api/v1/blogs', blogs);

<<<<<<< HEAD:server/app.js
app.use(errorHandler);

app.use("/auth", require("./routes/auth"));

// Setting up a port variable
const PORT = process.env.PORT || 5000;
=======
app.use("/auth", require("./routes/auth"));
>>>>>>> d840e21a3951d1166841a04cc14e219077628689:app.js

// Listen for requests
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))