//Basic setup
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const glob = require( 'glob' )
const mongoose = require('mongoose');

//Setup authentication/log in with auth0
const { auth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: 'http://localhost:3000',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

//Uses glob to require all models and routes
glob.sync( './routes/*.js' ).forEach( function( file ) {
    app.use(require( path.resolve( file ) ));
  });
  glob.sync( './models/*.js' ).forEach( function( file ) {
    app.use(require( path.resolve( file ) ));
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//DB Setup
const url = process.env.MONGO_URL;
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
  })
  

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;