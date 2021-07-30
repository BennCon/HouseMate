const express = require('express');
const app = express();
const { BulkWriteError } = require('mongodb');
const User = require('../models/User');
const House = require('../models/House');
app.set('view engine', 'ejs');
const { requiresAuth } = require('express-openid-connect');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const crypto = require("crypto"); //for generating random HouseID
// crypto.randomBytes(20).toString('hex') //Generates random string

//Render form for new house
app.get('/house/new', requiresAuth(), (req, res, next) => {
    var persList = [];

    res.render('new_house', {
        page: "New House",
        person_list: persList
    });
});

//Submit form responses
app.post('/house/submit', requiresAuth(), (req,res,next) => {
    console.log(req.body.name);
    res.send(req.body.name);
});


module.exports = app;