const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const feedRoute = require('./routes/feedRoutes');
const userRoute = require('./routes/authRoutes');
const formRoute = require('./routes/formRoutes');
const cookieParser = require('cookie-parser');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middleware
app.use(express.json());
app.use(cookieParser());

 // Parse incoming request bodies as JSON with a size limit of 200MB
 app.use(bodyParser.json({ limit: "200mb" }));

 // Parse URL-encoded bodies and extended payloads with a size limit of 200MB
 app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
 
 


 app.use('', feedRoute());
 app.use('', userRoute());
 app.use('',formRoute());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;