// import './Controllers/RegistrationController.js';
// server.js
const RegistrationController = require('./Controllers/RegistrationController');
const LoginController = require('./Controllers/LoginController');
const http = require('http');
const fs = require('fs');
const url = require('url');
const database = require('./database');
const { user } = require('./config');

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);
  global.database = database;

  const parseBody = function(body){
    console.log('Raw request body:', body);
      const data = {};
      const keyValuePairs = body.split('&');
      for (const pair of keyValuePairs) {
        const [key, value] = pair.split('=');
        data[key] = value;
      }
      return data;
  };

  if (method === 'GET' && parsedUrl.pathname.endsWith('.css')) {
    fs.readFile(parsedUrl.pathname.substring(1), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } 
  else if (method === 'GET' && parsedUrl.pathname.endsWith('.js')) {
    fs.readFile(parsedUrl.pathname.substring(1), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  }
  else if (method === 'GET' && parsedUrl.pathname.endsWith('.png')) {
    fs.readFile(parsedUrl.pathname.substring(1), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    });
  }
  else if (method === 'GET' && parsedUrl.pathname === '/') {
    fs.readFile('./Views/index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } 
  else if (method === 'GET' && parsedUrl.pathname === '/login') {
    fs.readFile('./Views/login.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } 
  else if (method === 'GET' && parsedUrl.pathname === '/signup') {
    fs.readFile('./Views/signup.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } 
  else if (method === 'POST' && parsedUrl.pathname === '/register') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      
      const data = parseBody(body);
      const controller_data = RegistrationController.register(data);

      // res.writeHead(302, { 'Location': '/homePage.html' });
      // res.end();

      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.readFile('./Views/homePage.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
          res.end();
      });
      console.log('Parsed data:', data);
      
    });
  } 
  else if (method === 'POST' && parsedUrl.pathname === '/login') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {

      const data = parseBody(body);
      const controller_data = LoginController.login(data);

      console.log('Parsed data:', data);

      if (controller_data.status === 200) {
      // Redirect to home page
      // res.writeHead(302, { 'Location': '/homePage.html' });
      // res.end();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./Views/homePage.html', null, function (error, data) {
          if (error) {
              res.writeHead(404);
              res.write('Whoops! File not found!');
          } else {
              res.write(data);
          }
            res.end();
        });
      } else {
        // Redirect to login page
        fs.readFile('./Views/login.html', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end('Internal Server Error');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        });
      }

      // res.writeHead(controller_data.status, { 'Content-Type': 'application/json' });
      // res.end(controller_data.message);
      
    });
  } 
  else if (method === 'GET' && parsedUrl.pathname === '/homePage') {
    fs.readFile('./Views/homePage.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
  else if (method === 'GET' && parsedUrl.pathname === '/AboutUs') {
    fs.readFile('./Views/info.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
  else if (method === 'GET' && parsedUrl.pathname === '/fsSchedule') {
    fs.readFile('./Views/fsSchedule.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/octet-stream' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});