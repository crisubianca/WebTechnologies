// const jwt = require('jsonwebtoken');


// class LoginController {
//   static login = function(data) {
//     const { username, password } = data;
//     console.log('Username:', username);
//     console.log('Password:', password);

//     try {
//       const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
//       database.query(query, [username, password], (err, result) => {
//         if (err) {
//           console.error('Error executing MySQL query:', err);
//           return { status: 500, message: 'Internal Server Error' };
//         }
//         if (result.length === 0) {
//           return { status: 401, message: 'Invalid credentials' };
//         }
//       });
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//       return { status: 400, message: 'Bad Request' };
//     }
//     return { status: 200, message: 'Logged In Successfully' };
//   };
// }

// module.exports = LoginController;



// class LoginController {
//     static login = function(data){
    
//       const { username, password } = data;
//       console.log('Username:', username);
//       console.log('Password:', password);
     
//       try{ const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
//       database.query(query, [username, password], (err, result) => {
//         if (err) {
//           console.error('Error executing MySQL query:', err);
//           return {status: 500, message: 'Internal Server Error'};
//         }
//         if (result.length === 0) {
//           return {status: 401, message: 'Invalid credentials'};
//         }
//       });
//     }catch(error){
//         console.error('Error parsing JSON:', error);
//         return {status: 400, message: 'Bad Request'};
//     }
//     return {status: 200, message: 'Logged In Successfully'};
//     }
// }
// module.exports = LoginController;

const { viewLogin } = require('../views/templates');

function loginController(req, res) {
    switch(req.method) {
        case "GET" : 
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(viewLogin, 'utf8');
            break;
        default :
            res.writeHead(405);
            res.end();
    }
}

module.exports = {
    loginController
}