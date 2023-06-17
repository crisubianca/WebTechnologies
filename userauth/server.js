// server.js
const http = require('http');
const fs = require('fs');
const url = require('url');
const database = require('./database');
const { user } = require('./config');

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);

  if (method === 'GET' && parsedUrl.pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (method === 'POST' && parsedUrl.pathname === '/register') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      console.log('Raw request body:', body);
      const data = {};
      const keyValuePairs = body.split('&');
      for (const pair of keyValuePairs) {
        const [key, value] = pair.split('=');
        data[key] = value;
      }

      console.log('Parsed data:', data);

      // Extract the values
      const { username, email, password } = data;
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
      try {
        console.log('Parsed JSON:', username, email, password); // Log the parsed JSON values
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        database.query(query, [username, email, password], (err, result) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end('Internal Server Error');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('Registered successfully');
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('Bad Request');
      }
    });
  } 
  else if (method === 'POST' && parsedUrl.pathname === '/login') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      console.log('Raw request body:', body);
      const data = {};
      const keyValuePairs = body.split('&');
      for (const pair of keyValuePairs) {
        const [key, value] = pair.split('=');
        data[key] = value;
      }
      console.log('Parsed data:', data);
      const { username, password } = data;
      console.log('Username:', username);
      console.log('Password:', password);
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
      database.query(query, [username, password], (err, result) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end('Internal Server Error');
          return;
        }
        if (result.length === 0) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end('Invalid credentials');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('Logged in successfully');
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});