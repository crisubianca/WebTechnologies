
class RegistrationController {
    static register = async function(data){

      const database = require('./database');
      const bcrypt = require('bcrypt');
      const { username, email, password } = data;
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
      const comparePass = await bcrypt.compare('pass', hashedPassword);
      console.log(comparePass);
      try {
        console.log('Parsed JSON:', username, email, hashedPassword); // Log the parsed JSON values
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        database.query(query, [username, email, hashedPassword], (err, result) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            return {status: 500, message: 'Internal Server Error'};
          }
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return {status: 400, message: 'Bad Request'};

      }

      return {status: 200, message: 'Registered Successfully'};
    }
}
module.exports = RegistrationController;