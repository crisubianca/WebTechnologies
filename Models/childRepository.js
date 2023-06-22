const database = require('../database');

function create(child) {
    let query = 'INSERT INTO childern (first_name, last_name, birthdate, gender, user_id) VALUES (?, ?, ?, ?, ?)';
    let queryValues = [child.name, child.surname, child.birthdate, child.gender, child.user_id];
    return new Promise((resolve, reject) => {
        database.promise().query(query, queryValues).then(results => {
            console.log(results);
            resolve(results);
        }).catch(error => {
            reject(error);
        })
    })
}

function getAll() {
    let query = "SELECT * FROM children";
    return new Promise((resolve, reject) => {
        database.promise().query(query)
        .then((results) => {
            resolve(results[0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function findByParentId(id) {
    let query = "SELECT * FROM children WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        database.promise().query(query, [id])
        .then((results) => {
            if(!results[0][0]) {
                reject("child not found");
            }
            resolve(results[0][0]);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function deleteByParentId(id) {
    let queryText = "delete from children where user_id = ?";
    return new Promise((resolve, reject) => {
        database.promise().query(queryText, [id])
        .then((results) => {
            resolve(results);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

function deleteById(id) {
    let queryText = "delete from users where id = ?";
    return new Promise((resolve, reject) => {
        database.promise().query(queryText, [id])
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
    findByParentId,
    deleteByParentId,
    deleteById,
    getAll
}