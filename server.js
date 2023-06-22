// import './Controllers/RegistrationController.js';
// server.js
// const secretKey = "t56ZJLXr8Mk6Yb6te4LVRpt4zWD65GFH";
// const RegistrationController = require('./Controllers/RegistrationController');
// const LoginController = require('./Controllers/LoginController');
// const http = require('http');
// const fs = require('fs');
// const url = require('url');
const database = require('./database');
// const { user } = require('./config');
// const jwt = require('jsonwebtoken');

// const server = http.createServer((req, res) => {
//   const { method, url: reqUrl } = req;
//   const parsedUrl = url.parse(reqUrl, true);
//   global.database = database;

//   const parseBody = function(body){
//     console.log('Raw request body:', body);
//       const data = {};
//       const keyValuePairs = body.split('&');
//       for (const pair of keyValuePairs) {
//         const [key, value] = pair.split('=');
//         data[key] = value;
//       }
//       return data;
//   };

//   if (method === 'GET' && parsedUrl.pathname.endsWith('.css')) {
//     fs.readFile(parsedUrl.pathname.substring(1), (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/css' });
//       res.end(data);
//     });
//   } 
//   else if (method === 'GET' && parsedUrl.pathname.endsWith('.js')) {
//     fs.readFile(parsedUrl.pathname.substring(1), (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/css' });
//       res.end(data);
//     });
//   }
//   else if (method === 'GET' && parsedUrl.pathname.endsWith('.png')) {
//     fs.readFile(parsedUrl.pathname.substring(1), (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'image/png' });
//       res.end(data);
//     });
//   }
//   else if (method === 'GET' && parsedUrl.pathname === '/') {
//     fs.readFile('./Views/index.html', (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });
//   } 
//   else if (method === 'GET' && parsedUrl.pathname === '/login') {
//     fs.readFile('./Views/login.html', (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });
//   } 
//   else if (method === 'GET' && parsedUrl.pathname === '/signup') {
//     fs.readFile('./Views/signup.html', (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });
//   } 
//   else if (method === 'POST' && parsedUrl.pathname === '/register') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk;
//     });
//     req.on('end', () => {
      
//       const data = parseBody(body);
//       const controller_data = RegistrationController.register(data);

//       // res.writeHead(302, { 'Location': '/homePage.html' });
//       // res.end();

//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       fs.readFile('./Views/homePage.html', null, function (error, data) {
//         if (error) {
//             res.writeHead(404);
//             res.write('Whoops! File not found!');
//         } else {
//             res.write(data);
//         }
//           res.end();
//       });
//       console.log('Parsed data:', data);
      
//     });
//   } 
//   else if (method === 'POST' && parsedUrl.pathname === '/login') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk;
//     });
//     req.on('end', () => {
//       const data = parseBody(body);
//       const controller_data = LoginController.login(data);
  
//       console.log('Parsed data:', data);
  
//       if (controller_data.status === 200) {
//         // Generate a JWT token
//         const token = jwt.sign({ username: data.username }, secretKey, { expiresIn: '1h' });
  
//         // Redirect to home page with the token as a query parameter
//         res.writeHead(302, { 'Location': '/homePage?token=' + token });
//         res.end();
//       } else {
//         // Redirect to login page
//         fs.readFile('./Views/login.html', (err, data) => {
//           if (err) {
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end('Internal Server Error');
//             return;
//           }
//           res.writeHead(200, { 'Content-Type': 'text/html' });
//           res.end(data);
//         });
//       }
//     });
//   }  
//   else if (method === 'GET' && parsedUrl.pathname === '/homePage') {
//     const token = parsedUrl.query.token;
  
//     if (token) {
//       // Verify the token
//       jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//           res.writeHead(401, { 'Content-Type': 'application/json' });
//           res.end(JSON.stringify({ error: 'Invalid token' }));
//           return;
//         }
  
//         // Token is valid, serve the home page
//         fs.readFile('./Views/homePage.html', (err, data) => {
//           if (err) {
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end('Internal Server Error');
//             return;
//           }
//           res.writeHead(200, { 'Content-Type': 'text/html' });
//           res.end(data);
//         });
//       });
//     } else {
//       // Token is missing, redirect to login page
//       res.writeHead(302, { 'Location': '/login' });
//       res.end();
//     }
//   }  
//   else if (method === 'GET' && parsedUrl.pathname === '/AboutUs') {
//     fs.readFile('./Views/info.html', (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });
//   }
//   else if (method === 'GET' && parsedUrl.pathname === '/fsSchedule') {
//     fs.readFile('./Views/fsSchedule.html', (err, data) => {
//       if (err) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end('Internal Server Error');
//         return;
//       }
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     });
//   }
//   else {
//     res.writeHead(404, { 'Content-Type': 'application/octet-stream' });
//     res.end('Not Found');
//   }
// });


const http = require("http");
const url = require("url");
const controllers = require("./Controllers");
require("dotenv").config();

let pathRegex = /^\.\/public\/.+/;
const server = http.createServer((req, res) => {
    req.url = `.${req.url}`;
    console.log(url.parse(req.url, true).pathname);
    if (pathRegex.test(req.url)) {
        controllers.publicController(req, res);
    } else {
        switch (url.parse(req.url, true).pathname) {
            case "./":
                controllers.startPageController(req, res);
                break;
            case "./favicon.ico":
                req.url = "./public/images/logo.png";
                controllers.publicController(req, res);
                break;
            case "./logo.png":
                req.url = "./public/images/logo.png";
                controllers.publicController(req, res);
                break;
            case "./register":
                controllers.registerController(req, res);
                break;
            case "./registerUser":
                controllers.registerUserController(req, res);
                break;
            case "./login":
                controllers.loginController(req, res);
                break;
            case "./loginUser":
                controllers.loginUserController(req, res);
                break;
            case "./homePage":
                controllers.homePageController(req, res);
                break;
            case "./logout":
                controllers.logoutController(req, res);
                break;
            case "./deleteAccount":
                controllers.deleteAccountController(req, res);
                break;
            default:
                console.log("ERR!!");
        }
    }
});



const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});