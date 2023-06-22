const { viewHomePage } = require('../views/templates');
const { auth } = require("../utils");

async function homePageController(req, res) {
    let user = auth(req, res);
    if(!user) {
        console.log("user is not authorized");
        res.writeHead(401, {'Content-Type' : 'text/html'});
        res.end("Unauthorized", 'utf8');
    } else {
        switch(req.method) {
            case 'GET' : 
                res.end(viewHomePage, 'utf8');
                break;
            default :
                res.writeHead(405);
                res.end();
        }
    }
}

module.exports = {
    homePageController
}