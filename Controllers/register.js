const { viewSignUp } = require('../views/templates');

function registerController(req, res) {
    switch(req.method) {
        case 'GET' : {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(viewSignUp, 'utf8');
            break;
        }
        default : 
            res.writeHead(405);
            res.end();
    }

}

module.exports = {
    registerController
}