const { viewStartPage } = require('../views/templates');

function startPageController(req, res) {
    switch(req.method) {
        case "GET" : 
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(viewStartPage, 'utf8');
            break;
        default :
            res.writeHead(405);
            res.end();
    }
}

module.exports = {
    startPageController
}