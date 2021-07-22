//Basic setup
const express = require('express');
const app = express();
const path = require('path');
const glob = require( 'glob' )


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

//Port
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;
