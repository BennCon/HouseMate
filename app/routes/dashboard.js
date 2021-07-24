const express = require('express');
const app = express();
const { BulkWriteError } = require('mongodb');
const NormUser = require('../models/NormUser');
app.set('view engine', 'ejs');
const { requiresAuth } = require('express-openid-connect');

app.get('/dashboard',  requiresAuth(), (req, res) => {
    //JSON of details about current user
    const currentUser = req.oidc.user;
    
    //If user is in external user DB proceed, otherwise (first login) add them to external DB
    NormUser.findOne({userID: currentUser.sub }).select("userID").lean().then(result => {
        if (result) {
            console.log("ya");
        } else {
            console.log("na");
            const new_user  = new NormUser ({
                name: currentUser.name,
                userID: currentUser.sub
            });
        
            new_user.save((error, document) => {
                if (error) console.log(error);
                console.log(document);
            })
        }
    });

});

module.exports = app;