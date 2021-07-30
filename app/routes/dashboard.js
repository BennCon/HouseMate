const express = require('express');
const app = express();
const { BulkWriteError } = require('mongodb');
const User = require('../models/User');
app.set('view engine', 'ejs');
const { requiresAuth } = require('express-openid-connect');
// const crypto = require("crypto"); //for generating random HouseID
// crypto.randomBytes(20).toString('hex') //Generates random string

//Route gets the logged in user from the external user DB
app.get('/dashboard',  requiresAuth(), (req, res, next) => {
    //JSON of details about current user from Auth0 DB
    res.locals.currentUser = req.oidc.user;
    
    //If user is in external user DB proceed, otherwise (first login) add them to external DB
    User.findOne({userID: res.locals.currentUser.sub }).select("userID").lean().then(result => {
        if (!result) {
            const new_user  = new User ({
                name: res.locals.currentUser.name,
                userID: res.locals.currentUser.sub,
                house: null
            });
    
            new_user.save((error, document) => {
                if (error) console.log(error);
                console.log(document);
            })
        }
    });
    
    //Updates the current user object to refer to external database
    User.findOne({userID: res.locals.currentUser.sub}, (err,obj) => {
        res.locals.currentUser = obj;
        next();
    });


});

app.get('/dashboard', requiresAuth(), (req, res, next) => {
    res.render('dashboard', {
        page: "Dashboard",
        house: res.locals.currentUser.house
    });
});


module.exports = app;