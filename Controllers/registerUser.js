const { getPostData } = require("../utils");
const userRepository = require("../Models/userRepository");
const bcrypt = require("bcrypt");

let saltRounds = 10;
async function registerUserController(req, res) {
    switch(req.method) {
        case 'POST' :
            register(req, res);
            break;
        default :
            res.writeHead(405);
            res.end();
    }
}

async function register(req, res) {
    try {
        const body = await getPostData(req);
        const { username, email, password } = body;
        const user = {
            username,
            email,
            password,
        };

        user.password = await bcrypt.hash(password, saltRounds);

        console.log(
            user.username,
            user.email,
            user.password
        );

        userRepository
            .create(user)
            .then((result) => {
                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end("success");
                // console.log("user added succesfully");
            })
            .catch((error) => {
                res.writeHead(409, {"Content-Type" : "text/plain"});
                res.end(error.constraint);
                // console.log("user cannot be added into database");
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    registerUserController,
};