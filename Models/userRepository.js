const database = require('./database');

function create(user) {
    let query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    let queryValues = [user.username, user.email, user.password];
    return new Promise((resolve, reject) => {
        database.query(query, queryValues).then(results => {
            console.log(results);
            resolve(results);
        }).catch(error => {
            reject(error);
        })
    })
}

function getAll() {
    let query = "SELECT * FROM users";
    return new Promise((resolve, reject) => {
        database.query(query)
        .then((results) => {
            resolve(results.rows);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function findById(id) {
    let query = "SELECT * FROM users WHERE id = $1";
    return new Promise((resolve, reject) => {
        database.query(query, [id])
        .then((results) => {
            if(!results.rows[0]) {
                reject("user not found");
            }
            resolve(results.rows[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function findByUsername(username) {
    let query = "select * from users where username = $1";
    return new Promise((resolve, reject) => {
        database.query(query, [username])
        .then((results) => {
            if(!results.rows[0]) {
                reject("user not found");
            }
            resolve(results.rows[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function deleteByUsername(username) {
    let queryText = "delete from users where username = $1";
    return new Promise((resolve, reject) => {
        database.query(queryText, [username])
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function deleteById(id) {
    let queryText = "delete from users where id = $1";
    return new Promise((resolve, reject) => {
        database.query(queryText, [id])
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            reject(error);
        });
    })
}


module.exports = {
    create,
    findByUsername,
    findById,
    deleteByUsername,
    deleteById,
    getAll
}