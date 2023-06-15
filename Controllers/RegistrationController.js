class RegistrationController {
    static register = function(data){

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