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
const crypto = require("crypto"); //for generating random HouseID
// crypto.randomBytes(20).toString('hex') //Generates random string

//Render form for new house
app.get('/house/new', requiresAuth(), (req, res, next) => {
    //If user already has a house, redirect to dashboard
    User.findOne({userID: req.oidc.user.sub, house: !null}).select("house").lean().then(result => {
        if (result) {
            return res.redirect('/dashboard');
        } else {
            res.render('new_house', {
                page: "New House",
            });
        }; 
    });
});

//Submit form responses
app.post('/house/submit', requiresAuth(), (req,res,next) => {
    //Creates new house in DB
    const new_house = new House ({
        houseID: crypto.randomBytes(20).toString('hex'), //Generates random string
        name: req.body.name,
        ownerID: req.oidc.user.sub,
        members: req.body.housemates.split(','),
        bills: []
    })

    new_house.save((error, document) => {
        if (error) console.log(error);
        console.log(document);
    })

    User.findOne({userID: req.oidc.user.sub}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            docs.house = new_house.houseID;
            docs.save();
        };
    });
    res.send("Success!");
    res.redirect('/dashboard');
});


module.exports = app;