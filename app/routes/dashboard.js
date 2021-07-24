const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const { requiresAuth } = require('express-openid-connect');

app.get('/dashboard',  requiresAuth(), (req, res) => {
    res.send('Dashboard');
});

module.exports = app;