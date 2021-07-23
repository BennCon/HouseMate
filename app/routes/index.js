const express = require('express');
const app = express();
app.set('view engine', 'ejs');

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    const isAuth = (req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    res.render('index', {
        isAuth: isAuth,
        page: "Home"
    });
  });


module.exports = app;

// const { requiresAuth } = require('express-openid-connect');

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });
