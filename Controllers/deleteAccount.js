const { auth } = require('../utils');
const userRepository = require("../Models/userRepository");
const childRepository = require("../Models/childRepository");
const { viewStartPage} = require("../views/templates.js");
// const crypto = require("crypto");
// const FormData = require('form-data');
// const fetch = require('node-fetch');
require("dotenv").config();

function deleteAccountController(req, res) {
    let user = auth(req, res);
    if(!user) {
        console.log("user is not authorized");
        res.writeHead(401, {'Content-Type' : 'text/html'});
        res.end("Unauthorized", 'utf8');
    } else {
                deleteAcount(req, res, user);        
    }
}

function deleteAcount(req, res, user) {
    userRepository.findByUsername(user.username).then((result) => {
        childRepository.deleteByParentId(result.id).then((result) => {
            console.log("Result:", result);
            userRepository.deleteByUsername(user.username).then(() => {
                res.writeHead(200, [       
                    ['Set-Cookie', `Token=""; HttpOnly; Max-Age=1`],
                    ['Set-Cookie', `RefreshToken=""; HttpOnly; Max-Age=1`],
                    ['Set-Cookie', `user_id=""; HttpOnly; Max-Age=1; Path=/`],
                    ['Set-Cookie', `user_username=""; HttpOnly; Max-Age=1; Path=/`]
                    ]);
                res.end(viewStartPage, 'utf8');
            }).catch(err => {
                console.log(err);
                res.writeHead(500, {
                    'Content-Type' : 'application/json'
                });
                res.end();
            })
        })
    }).catch(error =>{
        console.log(error);
        res.writeHead(500);
        res.end();
    });
}

module.exports = {
    deleteAccountController
}
